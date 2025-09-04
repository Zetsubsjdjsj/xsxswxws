import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next()

  // Attach Supabase session to the request
  await createMiddlewareClient({ req: request, res: response })

  // Add headers to prevent MetaMask detection
  response.headers.set("Content-Security-Policy", "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';")

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
