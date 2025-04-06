import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import cookie from 'cookie';

// Helper to validate required environment variables
const validateEnv = () => {
  if (!process.env.SESSION || !process.env.AUTH_SECRET) {
    throw new Error('Missing required environment variables: SESSION, AUTH_SECRET');
  }
};

// Middleware function
export default async function middleware(req) {
  try {
    validateEnv();

    const { pathname } = req.nextUrl;
    const origin = process.env.NEXTAUTH_URL;

    // Skip middleware for static assets, public routes, and API calls
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.startsWith('/api/') ||
      pathname === '/favicon.ico'
    ) {
      return NextResponse.next();
    }

    // Parse cookies to retrieve the auth token
    const cookies = cookie.parse(req.headers.get('cookie') || '');
    const authToken = cookies[process.env.SESSION];
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    // If user is logged in
    if (authToken && token) {
      // Redirect away from the login page `/` or `/login` to `/dashboard`
      if ( pathname === '/login') {
        const dashboardUrl = new URL(`/`, origin);
        return NextResponse.redirect(dashboardUrl);
      }

      // Allow access to `/dashboard` and its sub-routes
      if (pathname.startsWith('/dashboard')) {
        return NextResponse.next();
      }
    }

    // If user is not logged in and trying to access `/dashboard`, redirect to `/login`
    if (!authToken && pathname.startsWith('/dashboard')) {
      const loginUrl = new URL('/login', origin);
      return NextResponse.redirect(loginUrl);
    }

    // Allow all other requests (e.g., public pages)
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error.message, {
      pathname: req.nextUrl.pathname,
      stack: error.stack,
    });
    return NextResponse.next();
  }
}

// Configuration for routes the middleware should match
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

