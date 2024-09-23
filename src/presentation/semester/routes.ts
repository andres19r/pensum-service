import { Router } from "express";
import { SemesterController } from "./controller";

export class SemesterRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new SemesterController();

    router.get("/", controller.getSemesters);
    router.post("/", controller.createSemester);
    router.get("/:id", controller.getSemesterById);
    router.put("/:id", controller.updateSemester);
    router.delete("/:id", controller.deleteSemester);

    return router;
  }
}
