import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // Define API routes with /api prefix
  
  // API endpoint to fetch doctors data
  app.get("/api/doctors", async (req: Request, res: Response) => {
    try {
      const response = await axios.get("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
      return res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching doctors data:", error);
      return res.status(500).json({
        error: "Failed to fetch doctors data from external API",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
