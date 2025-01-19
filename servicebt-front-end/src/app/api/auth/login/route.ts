// // src/app/api/auth/login/route.ts
// import { cookies } from 'next/headers';

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();
    
//     // Verify credentials with your backend
//     const { accessToken, refreshToken } = await yourAuthService.login(email, password);

//     // Set HTTP-only cookies
//     cookies().set({
//       name: 'accessToken',
//       value: accessToken,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 15 * 60 // 15 minutes
//     });

//     cookies().set({
//       name: 'refreshToken',
//       value: refreshToken,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 // 7 days
//     });

//     return Response.json({ success: true });
//   } catch (error) {
//     return Response.json({ error: 'Authentication failed' }, { status: 401 });
//   }
// }
import { cookies } from "next/headers";

async function loginWithBackend(email: string, password: string) {
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

  const response = await fetch(`${BACKEND_API_URL}/api/v1/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Invalid credentials");
  }

  return response.json(); // Expected response: { accessToken, refreshToken }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Authenticate with backend
    const { accessToken, refreshToken } = await loginWithBackend(email, password);

    // Set HTTP-only cookies
    (await
          // Set HTTP-only cookies
          cookies()).set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
    });

    (await cookies()).set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Login failed:", error.message);
    return Response.json({ error: error.message || "Authentication failed" }, { status: 401 });
  }
}
