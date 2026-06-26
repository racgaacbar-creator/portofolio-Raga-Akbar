import { NextResponse } from 'next/server';
import { savePortfolioData } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await savePortfolioData(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Data Save Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
  }
}
