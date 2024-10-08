
import { Request, Response } from "express";

export class SubjectController {
  constructor() {}

  getAll = async (req: Request, res: Response) => {
    return res.json('getAll')
  };

  getById = async (req: Request, res: Response) => {
    return res.json('getById')
  };

  create = async (req: Request, res: Response) => {
    return res.json('create')
  };

  update = async (req: Request, res: Response) => {
    return res.json('update')
  };

  delete = async (req: Request, res: Response) => {
    return res.json('delete')
  };
}
