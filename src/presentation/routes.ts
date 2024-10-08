import { Router } from "express";
import { PensumRoutes } from "./pensum/routes";
import { SubjectRoutes } from "./subjects/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/pensum", PensumRoutes.routes);
    router.use("/api/subjects", SubjectRoutes.routes);

    return router;
  }
}
