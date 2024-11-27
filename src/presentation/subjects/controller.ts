import { Request, Response } from "express";
import { CreateSubjectDto } from "../../domain/dtos";
import { SubjectService } from "../services";
import { CustomError } from "../../domain/errors/custom-error";
import { UpdateSubjectDto } from "../../domain/dtos/subject/update-subject.dto";

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
    this.subjectService
      .getAllSubjects()
      .then((subjects) => res.json(subjects))
      .catch((error) => this.handleError(error, res));
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    this.subjectService
      .getSubjectById(id)
      .then((subject) => res.json(subject))
      .catch((error) => this.handleError(error, res));
  };

  create = (req: Request, res: Response) => {
    const [error, createSubjectDto] = CreateSubjectDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.subjectService
      .createSubject(createSubjectDto!)
      .then((subject) => res.status(201).json(subject))
      .catch((error) => this.handleError(error, res));
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateSubjectDto = UpdateSubjectDto.create(req.body);

    this.subjectService
      .modifySubjectById(id, updateSubjectDto)
      .then((subject) => res.json(subject))
      .catch((error) => this.handleError(error, res));
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    this.subjectService
      .deleteSubject(id)
      .then(subject => res.json(subject))
      .catch(error => this.handleError(error, res));
  };
}
