import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import path from "path";

export const baseMiddleware = (app) => {
  // Serve favicon
  app.use(
    favicon(path.join(process.cwd(), "public", "favicon.ico"))
  );

  // Static files
  app.use(express.static("public"));

  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Cookies
  app.use(cookieParser());

  // Logger
  app.use(morgan("dev"));
};
