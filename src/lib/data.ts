import { list, put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import localData from '../../data.json';

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

  if (token) {
    try {
      console.log("Fetching portfolio data from Vercel Blob...");
      const response = await list({ token });
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

  // Fallback: Read local data.json file from disk (development or if token is missing)
  try {
    if (fs.existsSync(localDataPath)) {
      const fileContent = fs.readFileSync(localDataPath, 'utf8');
      return JSON.parse(fileContent) as PortfolioData;
    }
  } catch (error) {
    console.error("Failed to read local data.json file:", error);
  }

  return localData as PortfolioData;
}

export async function savePortfolioData(newData: PortfolioData): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  // In development, save to local filesystem to ensure local state is persistent
  if (process.env.NODE_ENV === 'development') {
    try {
      console.log("Saving portfolio data to local data.json...");
      fs.writeFileSync(localDataPath, JSON.stringify(newData, null, 2), 'utf8');
    } catch (error) {
      console.error("Failed to write local data.json:", error);
      throw new Error("Failed to save data locally");
    }
  }

  // If Vercel Blob token is configured, upload to Vercel Blob
  if (token) {
    try {
      console.log("Saving portfolio data to Vercel Blob...");
      await put('data.json', JSON.stringify(newData, null, 2), {
        access: 'public',
        addRandomSuffix: false,
        token: token,
      });
    } catch (error) {
      console.error("Failed to save data to Vercel Blob:", error);
      throw new Error("Failed to save data to cloud storage");
    }
  } else if (process.env.NODE_ENV !== 'development') {
    throw new Error("BLOB_READ_WRITE_TOKEN is missing. Cannot save data to cloud storage.");
  }
}
