import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "MONGODB_URI",
  "JWT_TOKEN",
];

const optionalEnv = [
  "PORT",
  "NODE_ENV",
  "COOKIE_DOMAIN",
];
// 🔍 Check required env vars
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
  }
});

// ℹ️ Optional env info (useful for debugging)
optionalEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Optional environment variable not set: ${key}`);
  }
});


export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_TOKEN,
  nodeEnv: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === "production",
  cookieDomain: process.env.COOKIE_DOMAIN,
};

if (!config.mongoUri || !config.jwtSecret) {
  console.error("🛑 Server stopped due to missing critical environment variables");
  process.exit(1);
}


export const envConfig = Object.freeze(config);
