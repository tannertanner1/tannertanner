import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  // console.log(`Username: ${username}, Password: ${password}`);

  // Log hashed password
  // isValidPassword(password, "acbdefg");
  // return false;

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.HASHED_ADMIN_PASSWORD as string
    ))
  );
}

export const config = {
  matcher: "/dashboard/:path*",
};

// @note bcrypt

// import { NextRequest, NextResponse } from "next/server";
// import { isValidPassword } from "./lib/isValidPassword";

// export async function middleware(req: NextRequest) {
//   if (!(await isAuthenticated(req))) {
//     return new NextResponse("Unauthorized", {
//       status: 401,
//       headers: { "WWW-Authenticate": "Basic" },
//     });
//   }
// }

// async function isAuthenticated(req: NextRequest) {
//   const authHeader =
//     req.headers.get("authorization") || req.headers.get("Authorization");

//   if (authHeader == null) return false;

//   const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
//     .toString()
//     .split(":");

//   const hashedPassword = process.env.HASHED_ADMIN_PASSWORD as string;

//   // For testing, you can log the username and password
//   console.log(username, password);

//   return (
//     username === process.env.ADMIN_USERNAME &&
//     (await isValidPassword(password, hashedPassword))
//   );
// }

// export const config = {
//   matcher: "/admin/:path*",
// };
