import { Router } from "express";
import { PensumRoutes } from "./pensum/routes";
import { SemesterRoutes } from "./semester/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/pensum", PensumRoutes.routes);
    router.use("/api/semester", SemesterRoutes.routes);

    return router;
  }
}
