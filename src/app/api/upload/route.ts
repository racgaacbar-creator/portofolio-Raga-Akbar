import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;

    // Use local fallback in development environment only if token is missing
    if (process.env.NODE_ENV === 'development' && !token) {
      console.warn("BLOB_READ_WRITE_TOKEN is missing in development. Saving file to local public/uploads directory.");
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `profile-${Date.now()}${path.extname(file.name)}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({ url: `/uploads/${fileName}` });
    }

    // In production (or in development if token is present), upload directly to Vercel Blob Store
    // (OIDC is automatically used on Vercel if token is missing)
    const options: any = { access: 'public' };
    if (token) {
      options.token = token;
    }

    const blob = await put(`uploads/${Date.now()}-${file.name}`, file, options);
    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to upload file.' }, { status: 500 });
  }
}


