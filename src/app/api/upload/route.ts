import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    // Upload directly to Vercel Blob Store
    const blob = await put(`uploads/${Date.now()}-${file.name}`, file, {
      access: 'public',
    });

    // Return the public URL for storage and front-end preview
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}

