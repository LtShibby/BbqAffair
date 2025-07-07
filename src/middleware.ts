import { NextResponse } from 'next/server'

export async function middleware() {
  // Temporarily disable middleware logic to debug 404 issues
  return NextResponse.next()
}

export const config = {
}