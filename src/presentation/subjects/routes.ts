import { Router } from "express";
import { SubjectController } from "./controller";
import { SubjectService } from "../services";

export class SubjectRoutes {
  static get routes(): Router {
    const router = Router();
    const subjectService = new SubjectService();
    const controller = new SubjectController(subjectService);

    /**
     * @swagger
     * tags:
     *   - name: Subjects
     *     description: Endpoints related to Subjects operations
     * /api/subjects:
     *   get:
     *     tags:
     *       - Subjects
     *     summary: Get the list of subjects
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns a list of subjects
     */
    router.get("/", controller.findAll);

    /**
     * @swagger
     * tags:
     *   - name: Subjects
     * /api/subjects:
     *   post:
     *     tags:
     *       - Subjects
     *     summary: Creates a new subject
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the subject
     *                 example: Math-101
     *               semester:
     *                 type: number
     *                 description: The number of the semester
     *                 example: 1
     *               score:
     *                 type: number
     *                 description: The score of the subject
     *                 required: false
     *                 example: 51
     *               state:
     *                 type: string
     *                 description: The state of the subject
     *                 required: false
     *                 example: ACTIVE
     *                 enum:
     *                  - APPROVED
     *                  - IN PROGRESS
     *                  - PENDING
     *                  - REPROVED
     *               pensumId:
     *                 type: string
     *                 description: The _id of the pensum the subject belongs
     *                 example: 675a7439b05d2b18971a7c71
     *     responses:
     *       200:
     *         description: Returns the subject created
     */
    router.post("/", controller.create);

    /**
     * @swagger
     * tags:
     *   - name: Subjects
     * /api/subjects/{id}:
     *   get:
     *     tags:
     *       - Subjects
     *     summary: Get a specific subject by ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: Unique ID of the subject to be retrieved
     *         schema:
     *           type: string
     *           description: MongoDB ObjectId
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns the subject found
     *       404:
     *         description: Subject not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: Subject with ID {id} not found
     */
    router.get("/:id", controller.findById);

    /**
     * @swagger
     * tags:
     *   - name: Subjects
     * /api/subjects/{id}:
     *   put:
     *     tags:
     *       - Subjects
     *     summary: Modify a specific subject by ID
     *     description: Updates the details of a subject based on its unique ID. All body parameters are optional.
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: Unique ID of the subject to be modified
     *         schema:
     *           type: string
     *           description: MongoDB ObjectId
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the subject
     *                 example: Mathematics
     *               semester:
     *                 type: integer
     *                 description: The semester the subject belongs to
     *                 example: 2
     *               pensumId:
     *                 type: string
     *                 description: The associated pensum ID
     *                 example: 123e4567-e89b-12d3-a456-426614174000
     *               score:
     *                 type: number
     *                 format: float
     *                 description: The score for the subject
     *                 example: 95.5
     *               state:
     *                 type: string
     *                 description: The state of the subject (e.g., active or inactive)
     *                 example: ACTIVE
     *                 enum:
     *                  - APPROVED
     *                  - IN PROGRESS
     *                  - PENDING
     *                  - REPROVED
     *     responses:
     *       200:
     *         description: Returns the subject modified
     */
    router.put("/:id", controller.update);

    /**
     * @swagger
     * /api/subjects/{id}:
     *   delete:
     *     tags:
     *      - Subjects
     *     summary: Delete a specific subject by ID
     *     description: Deletes a subject from the system based on its unique ID.
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: Unique ID of the subject to be deleted
     *         schema:
     *           type: string
     *           description: MongoDB ObjectId
     *     responses:
     *       200:
     *         description: Subject successfully deleted
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Subject successfully deleted
     *       400:
     *         description: Invalid ID supplied
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: Invalid ID format
     *       404:
     *         description: Subject not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: Subject with ID {id} not found
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: An unexpected error occurred on the server
     */
    router.delete("/:id", controller.delete);

    return router;
  }
}
