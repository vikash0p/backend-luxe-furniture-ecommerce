import cors from "cors";

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:8081",
    "https://luxe-furniture-ecommerce.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
};

export const corsMiddleware = cors(corsOptions);
