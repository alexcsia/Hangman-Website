import { startServer } from "./server.ts";

startServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
