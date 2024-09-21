import { Request, Response } from "express";
import { PensumModel } from "../../data/mongo/models/pensum.model";
import { CreatePensumDto } from "../../domain/dtos/pensum/create-pensum.dto";

export class PensumController {
  constructor() {}

  getPensumInfo = async (req: Request, res: Response) => {
    const pensumList = await PensumModel.find();
    res.json(pensumList);
  };

  createPensum = async (req: Request, res: Response) => {
    const [error, createPensumDto] = CreatePensumDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const pensum = await PensumModel.create(createPensumDto);
    await pensum.save();
    res.json(pensum);
  };

  updatePensum = (req: Request, res: Response) => {
    res.json("updatePensum");
  };

  deletePensum = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletedPensum = await PensumModel.findByIdAndDelete({ id });
    res.json(deletedPensum);
  };
}
