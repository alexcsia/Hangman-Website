import express from "express";
import next from "next";
import authRoutes from "./routes/auth.ts";
import connectMongoDB from "./database.ts";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
app
  .prepare()
  .then(() => {
    server.use(express.json());
    server.use("/api/auth", authRoutes);

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(process.env.PORT, async () => {
      console.log("Ready on http://localhost:3000");
      await connectMongoDB();

      if (process.env.NODE_ENV === "development") {
        console.log("Running in development mode");
      } else if (process.env.NODE_ENV === "production") {
        console.log("Running in production mode");
      }
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });

export default server;
