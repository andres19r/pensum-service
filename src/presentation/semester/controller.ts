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

    try {
      const semester = new SemesterModel(createSemesterDto);
      const updatedPensum = await PensumModel.findOneAndUpdate(
        { _id: createSemesterDto?.pensumId },
        {
          $push: { semesters: semester._id },
        },
      );
      if (!updatedPensum)
        return res.status(400).json({
          error: `Pensum with id ${createSemesterDto?.pensumId} not found`,
        });
      await semester.save();
      res.json(semester);
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
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
