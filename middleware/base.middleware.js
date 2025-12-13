import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import path from "path";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import { envConfig } from "../config/env.js";

export const baseMiddleware = (app) => {
  // Serve favicon
  app.use( favicon(path.join(process.cwd(), "public", "favicon.ico")));

  // Static files
  app.use(express.static("public"));

  // Body parsers
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(helmet());
  app.use(compression());
  app.use(mongoSanitize());
  app.use(xss());

  // Cookies
  app.use(cookieParser());

  if(envConfig.isProduction){
    app.set('trust proxy', 1);
    app.use(rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests
      standardHeaders: true,
      legacyHeaders: false,

    }))
  }


  // Logger
  app.use(morgan("dev"));
};
