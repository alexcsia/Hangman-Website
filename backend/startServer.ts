import { startServer } from "./server";

startServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
