import { envConfig } from "../config/env.js";

export const createCookieOptions = () => {

  return {
    path: "/",
    httpOnly: true,
    secure: envConfig.isProduction,                     // ✅ true only in production
    sameSite: envConfig.isProduction ? "none" : "lax",  // ✅ prod: none | dev: lax

    // ✅ domain ONLY in production
    // domain: envConfig.isProduction ? process.env.COOKIE_DOMAIN : undefined,
  };
};
