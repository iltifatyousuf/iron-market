import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.ADMIN_SECRET || 'ironmarket-secret-key-change-in-production';
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Exclude the login page itself
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    const session = request.cookies.get('admin_session')?.value;
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      });
      return NextResponse.next();
    } catch (error) {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
