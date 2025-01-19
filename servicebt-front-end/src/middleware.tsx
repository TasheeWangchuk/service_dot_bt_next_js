// // src/middleware.ts

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token');

//   // Public paths that don't require authentication
//   const publicPaths = ['/auth/signin', '/auth/signup'];
//   if (publicPaths.includes(request.nextUrl.pathname)) {
//     if (token) {
//       return NextResponse.redirect(new URL('/dashboard', request.url));
//     }
//     return NextResponse.next();
//   }

//   // Check for protected routes
//   if (!token) {
//     return NextResponse.redirect(new URL('/auth/signin', request.url));
//   }

//   // Role-based route protection
//   const userRole = getUserRoleFromToken(token); // Implement this function

//   if (request.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
//     return NextResponse.redirect(new URL('/unauthorized', request.url));
//   }

//   if (request.nextUrl.pathname.startsWith('/serviceprovider') && userRole !== 'serviceProvider') {
//     return NextResponse.redirect(new URL('/unauthorized', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/admin/:path*',
//     '/serviceprovider/:path*',
//     '/dashboard/:path*',
//     '/auth/:path*'
//   ]
// };
// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Define protected paths that require authentication
  const protectedPaths = [
    '/Admin',
    '/Dashboard',
    '/ServiceProvider',
    '/Profile'
  ];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Allow public access to non-protected paths
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // For protected paths, check authentication
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  // No tokens present for protected path
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/Auth/SignIn', request.url));
  }

  // Has refresh token but no access token - attempt refresh
  if (!accessToken && refreshToken) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          Cookie: `refreshToken=${refreshToken.value}`
        }
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL('/Auth/SignIn', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/Auth/SignIn', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Admin/:path*',
    '/Dashboard/:path*',
    '/ServiceProvider/:path*',
    '/Profile/:path*'
  ]
};