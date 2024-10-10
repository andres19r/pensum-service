import { Router } from "express";
import { SubjectController } from "./controller";
import { SubjectService } from "../services";

export class SubjectRoutes {
  static get routes(): Router {
    const router = Router();
    const subjectService = new SubjectService()
    const controller = new SubjectController(subjectService);

    router.get("/", controller.findAll);
    router.post("/", controller.create);
    router.get("/:id", controller.findById);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
  }
}
