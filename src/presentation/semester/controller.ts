import { Request, Response } from "express";
import { SemesterModel } from "../../data/mongo/models/semester.model";
import { PensumModel } from "../../data/mongo/models/pensum.model";
import { CreateSemesterDto, UpdateSemesterDto } from "../../domain/dtos";

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
      const updatedPensum = await PensumModel.findByIdAndUpdate(
        createSemesterDto?.pensumId,
        {
          $push: { semesters: semester._id },
        },
        { new: true },
      );
      if (!updatedPensum)
        return res.status(400).json({
          error: `Pensum with id ${createSemesterDto?.pensumId} not found`,
        });
      await semester.save();
      res.json(semester);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.errmsg });
    }
  };

  updateSemester = async (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateSemesterDto] = UpdateSemesterDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const modifiedSemester = await SemesterModel.findByIdAndUpdate(
      id,
      { $set: updateSemesterDto?.values },
      { new: true },
    );

    if (!modifiedSemester)
      return res
        .status(404)
        .json({ error: `Semester with id ${id} not found` });

    // TODO: implement logic to update pensumId

    res.json(modifiedSemester);
  };

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
