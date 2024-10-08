import { Router } from "express";
import { PensumRoutes } from "./pensum/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/pensum", PensumRoutes.routes);

    return router;
  }
}
