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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Pastikan folder public/uploads ada
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Buat nama file unik (atau cukup timpa dengan nama profile.jpg jika khusus profile)
    const fileName = `profile-${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    // Kembalikan URL publik untuk diakses di frontend
    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}
