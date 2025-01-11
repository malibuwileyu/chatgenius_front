import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = ['/login', '/register'].includes(request.nextUrl.pathname);
  const isHomePage = request.nextUrl.pathname === '/';
  const isChatPage = request.nextUrl.pathname === '/chat';

  // If logged in and trying to access auth pages, redirect to home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If logged in and trying to access /chat, allow it
  if (token && isChatPage) {
    return NextResponse.next();
  }

  // If not logged in and trying to access protected pages, redirect to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/chat']
}; 