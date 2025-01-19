// src/app/api/auth/refresh/route.ts
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const refreshToken = cookies().get('refreshToken')?.value;
    
    if (!refreshToken) {
      return Response.json({ error: 'No refresh token' }, { status: 401 });
    }

    // Get new access token from your auth service
    const { accessToken } = await yourAuthService.refresh(refreshToken);

    // Set new access token cookie
    cookies().set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 // 15 minutes
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Token refresh failed' }, { status: 401 });
  }
}