import { supabase } from './supabase';

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

// Supabase fetching
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const { data, error } = await supabase
      .from('portfolio_settings')
      .select('json_data')
      .limit(1)
      .single();

    if (error) {
      console.error("Supabase Error fetching data:", error.message);
      throw new Error("Failed to read data from Supabase");
    }

    if (data && data.json_data) {
      return data.json_data as PortfolioData;
    }

    throw new Error("No data found in Supabase");
  } catch (error) {
    console.error("Error reading data, falling back to empty/default", error);
    throw error;
  }
}

export async function savePortfolioData(newData: PortfolioData): Promise<void> {
  try {
    // We update the only existing row. If there are multiple rows, we just update all (or assume there's only 1 row).
    // In our setup script, we only created one row.
    const { error } = await supabase
      .from('portfolio_settings')
      .update({ json_data: newData })
      .neq('id', '00000000-0000-0000-0000-000000000000'); // hacky way to update all rows (since there's only 1)

    if (error) {
      console.error("Supabase Error saving data:", error.message);
      throw new Error("Failed to save data to Supabase");
    }
  } catch (error) {
    console.error("Error writing to Supabase", error);
    throw new Error("Failed to save data");
  }
}
