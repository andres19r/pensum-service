import { Request, Response } from "express";

export class PensumController {
  constructor() {}

  getPensumInfo = (req: Request, res: Response) => {
    res.json('getPensumInfo')
  }

  createPensum = (req: Request, res: Response) => {
    res.json('createPensum')
  }

  updatePensum = (req: Request, res: Response) => {
    res.json('updatePensum')
  }

  deletePensum = (req: Request, res: Response) => {
    res.json('deletePensum')
  }
}