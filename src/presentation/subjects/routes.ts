import { Router } from "express";
import { SubjectController } from "./controller";

export class SubjectRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new SubjectController();

    router.get("/", controller.getAll);
    router.post("/", controller.create);
    router.get("/:id", controller.getById);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
  }
}
