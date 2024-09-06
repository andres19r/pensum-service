import { Router } from "express";
import { PensumController } from "./controller";

export class PensumRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PensumController();

    router.get('/', controller.getPensumInfo)
    router.post('/', controller.createPensum)
    router.put('/:id', controller.updatePensum)
    router.delete('/:id', controller.deletePensum)

    return router;
  }
}
