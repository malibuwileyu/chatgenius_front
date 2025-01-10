import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that don't require authentication
const publicPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // Create base response
  let response = NextResponse.next();

  // Add CSP headers for development
  if (process.env.NODE_ENV === 'development') {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; connect-src 'self' http://localhost:8080; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
    );
  }

  // Handle authentication
  if (publicPaths.includes(path)) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return response;
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 