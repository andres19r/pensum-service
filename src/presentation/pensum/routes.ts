import { Router } from "express";
import { PensumController } from "./controller";

export class PensumRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PensumController();

    /**
     * @swagger
     * tags:
     *   - name: Pensum
     *     description: Endpoints related to Pensum operations
     * /api/pensum:
     *   get:
     *     tags:
     *       - Pensum
     *     summary: Get pensum information
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns a pensum object
     */
    router.get("/", controller.getPensumInfo);

    /**
     * @swagger
     * tags:
     *   - name: Pensum
     *     description: Endpoints related to Pensum operations
     * /api/pensum:
     *   post:
     *     tags:
     *       - Pensum
     *     summary: Creates a new pensum
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               university:
     *                 type: string
     *                 description: The name of the university
     *                 example: UNANDES
     *               career:
     *                 type: string
     *                 description: Then name of the career
     *                 example: Systems Engineering
     *     responses:
     *       200:
     *         description: Returns a pensum object
     */
    router.post("/", controller.createPensum);

    /**
     * @swagger
     * tags:
     *   - name: Pensum
     *     description: Endpoints related to Pensum operations
     * /api/pensum:
     *   put:
     *     tags:
     *       - Pensum
     *     summary: Modify the current pensum
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               university:
     *                 type: string
     *                 description: The name of the university
     *                 required: false
     *                 example: UNANDES
     *               career:
     *                 type: string
     *                 description: Then name of the career
     *                 required: false
     *                 example: Systems Engineering
     *     responses:
     *       200:
     *         description: Returns a pensum object
     */
    router.put("/", controller.updatePensum);

    /**
     * @swagger
     * tags:
     *   - name: Pensum
     *     description: Endpoints related to Pensum operations
     * /api/pensum:
     *   delete:
     *     tags:
     *       - Pensum
     *     summary: Deletes the current pensum
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns a pensum object
     */
    router.delete("/", controller.deletePensum);

    return router;
  }
}
