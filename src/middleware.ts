import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set this to true to enable maintenance mode (site offline)
const IS_MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
  if (IS_MAINTENANCE_MODE) {
    // Return a 503 Service Unavailable response with a clean HTML page
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Site Under Maintenance</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f9fafb; color: #111827; }
          .container { text-align: center; padding: 2rem; max-width: 600px; }
          h1 { font-size: 2.5rem; margin-bottom: 1rem; color: #1f2937; }
          p { font-size: 1.125rem; color: #4b5563; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>We'll be back soon!</h1>
          <p>Sorry for the inconvenience. The site is temporarily offline for maintenance. Please check back shortly.</p>
        </div>
      </body>
      </html>`,
      {
        status: 503,
        headers: {
          'content-type': 'text/html',
          'Retry-After': '3600', // Tell search engines to check back later
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
