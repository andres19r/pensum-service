import { Request, Response } from "express";
import { SemesterModel } from "../../data/mongo/models/semester.model";
import { CreateSemesterDto } from "../../domain/dtos/semester/create-semester.dto";
import { PensumModel } from "../../data/mongo/models/pensum.model";

export class SemesterController {
  constructor() {}

  getSemesters = async (req: Request, res: Response) => {
    const semesters = await SemesterModel.find();
    res.json(semesters);
  };

  getSemesterById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const semester = await SemesterModel.findById(id);
    if (!semester)
      return res
        .status(404)
        .json({ error: `Semester with id ${id} not found` });

    res.json(semester);
  };

  createSemester = async (req: Request, res: Response) => {
    const [error, createSemesterDto] = CreateSemesterDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const semester = await SemesterModel.create(createSemesterDto);

    const pensum = await PensumModel.findById(createSemesterDto?.pensumId);
    if (!pensum)
      return res.status(400).json({
        error: `Pensum with id ${createSemesterDto?.pensumId} not found`,
      });
    semester.pensum = pensum._id;
    pensum.semesters.push(semester._id);
    await pensum.save();
    await semester.save();

    res.json(semester);
  };

  updateSemester = async (req: Request, res: Response) => {};

  deleteSemester = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedSemester = await SemesterModel.findByIdAndDelete(id);

    if (!deletedSemester)
      return res
        .status(404)
        .json({ error: `Semester with id ${id} not found` });

    res.json(deletedSemester);
  };
}
