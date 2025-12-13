
import cors from "cors";
import { envConfig } from "../config/env.js";

export const corsMiddleware = () => {

  const PROD_ORIGINS = ["https://luxe-furniture-ecommerce.vercel.app"];
  const DEV_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8081",
    "http://localhost:8080",
    "http://10.0.2.2:3000",
    "http://10.0.2.2:8081",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8081",

  ];

  const ALLOWED = envConfig.isProduction ? PROD_ORIGINS : DEV_ORIGINS;

  const corsOptions = {
    origin: (origin, callback) => {
      // React Native / Postman / curl (no origin header)
      if (!origin) {
        return callback(null, true);
      }

      if (ALLOWED.includes(origin)) {
        return callback(null, true);
      }

      // Log blocked origins
      console.warn(`🚫 CORS Blocked (${envConfig.isProduction ? "production" : "development"}) → ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "X-Requested-With",],
    exposedHeaders: ["Set-Cookie"],
  };

  return cors(corsOptions);
};
