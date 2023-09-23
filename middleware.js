export { default } from "next-auth/middleware"
export const config = {
    matcher: ["/dashboard", "/api/user/:path*"],
  }
//   "/:path*"