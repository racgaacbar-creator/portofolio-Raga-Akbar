import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login';
  const isAdminPath = path.startsWith('/admin');

  const token = request.cookies.get('admin_token')?.value || '';

  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login'
  ]
}
