import { Request, Response } from "express";
import { CreateSubjectDto } from "../../domain/dtos";
import { SubjectService } from "../services";
import { CustomError } from "../../domain/errors/custom-error";

export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  findAll = async (req: Request, res: Response) => {
    return res.json("getAll");
  };

  findById = async (req: Request, res: Response) => {
    return res.json("getById");
  };

  create = (req: Request, res: Response) => {
    const [error, createSubjectDto] = CreateSubjectDto.create(req.body);
    console.log(createSubjectDto)
    if (error) return res.status(400).json({ error });

    this.subjectService
      .createSubject(createSubjectDto!)
      .then((subject) => res.status(201).json(subject))
      .catch((error) => this.handleError(error, res));
  };

  update = async (req: Request, res: Response) => {
    return res.json("update");
  };

  delete = async (req: Request, res: Response) => {
    return res.json("delete");
  };
}
