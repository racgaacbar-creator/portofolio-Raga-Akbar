import { list, put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';


const localDataPath = path.join(process.cwd(), 'data.json');



export interface ProfileData {
  name: string;
  title: string;
  about: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  instagram: string;
  image?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Education {
  id: string;
  school: string;
  period: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export interface PortfolioData {
  profile: ProfileData;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  articles: Article[];
}

// Vercel Blob fetching
export async function getPortfolioData(): Promise<PortfolioData> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const isDev = process.env.NODE_ENV === 'development';

  // In production, we always try Vercel Blob first (OIDC is automatically used if token is missing)
  // In development, we only try Vercel Blob if the token is configured
  if (!isDev || token) {
    try {
      console.log("Fetching portfolio data from Vercel Blob...");
      const listOptions: any = {};
      if (token) {
        listOptions.token = token;
      }
      const response = await list(listOptions);
      const dataBlob = response.blobs.find(b => b.pathname === 'data.json');
      
      if (dataBlob) {
        const res = await fetch(dataBlob.url, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          return data as PortfolioData;
        }
      }
      console.log("data.json not found in Vercel Blob. Falling back to local/cached data.");
    } catch (error) {
      console.error("Failed to fetch data from Vercel Blob:", error);
    }
  }

  const defaultData: PortfolioData = {
    profile: { name: '', title: '', about: '', email: '', phone: '', linkedin: '', github: '', instagram: '' },
    skills: [],
    education: [],
    experience: [],
    projects: [],
    articles: []
  };

  // Fallback: Read local data.json file from disk
  try {
    if (fs.existsSync(localDataPath)) {
      const fileContent = fs.readFileSync(localDataPath, 'utf8');
      const parsedData = JSON.parse(fileContent);
      return { ...defaultData, ...parsedData } as PortfolioData;
    }
  } catch (error) {
    console.error("Failed to read local data.json file:", error);
  }

  // Default empty data if no file exists
  return defaultData;
}

export async function savePortfolioData(newData: PortfolioData): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  let localSaveError: any = null;
  let localSaveSuccess = false;
  // Always try to save locally (works for dev and local prod builds)
  try {
    console.log("Saving portfolio data to local data.json...");
    fs.writeFileSync(localDataPath, JSON.stringify(newData, null, 2), 'utf8');
    localSaveSuccess = true;
  } catch (error) {
    console.error("Failed to write local data.json:", error);
    localSaveError = error;
    // Don't throw yet, maybe Vercel Blob will succeed (e.g. deployed on Vercel where local write fails)
  }

  const isDev = process.env.NODE_ENV === 'development';

  // Upload to Vercel Blob in production, or in dev if token is present
  if (!isDev || token) {
    try {
      console.log("Saving portfolio data to Vercel Blob...");
      const putOptions: any = {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
      };
      if (token) {
        putOptions.token = token;
      }
      await put('data.json', JSON.stringify(newData, null, 2), putOptions);
    } catch (error: any) {
      console.error("Failed to save data to Vercel Blob:", error);
      throw new Error(error.message || "Failed to save data to cloud storage");
    }
  } else if (!localSaveSuccess) {
    // If both local save failed and no cloud save was attempted, throw error
    throw new Error(`Failed to save data locally (${localSaveError?.message}) and no cloud storage token provided`);
  }
}
