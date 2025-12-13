import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./utils/dbConnection.js";
import routes from "./mvc/routes/index.js";
import { baseMiddleware } from "./middleware/base.middleware.js";
import { envConfig } from "./config/env.js";
import { corsMiddleware } from "./middleware/cors.middleware.js";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
baseMiddleware(app);
app.use(corsMiddleware());


// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index");
});


app.use("/", routes);

app.use((req, res) => { res.status(404).json({ message: "Route not found" });});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(envConfig.port, () => {
            console.log(`🆗 Server running at http://localhost:${envConfig.port}`);
        });
    } catch (error) {
        console.error("DB connection error:", error.message);
        process.exit(1);
    }
};

startServer();
