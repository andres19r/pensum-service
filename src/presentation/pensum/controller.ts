import { Request, Response } from "express";
import { PensumModel } from "../../data/mongo/models/pensum.model";
import { CreatePensumDto } from "../../domain/dtos/pensum/create-pensum.dto";

export class PensumController {
  constructor() {}

  getPensumInfo = async (req: Request, res: Response) => {
    const pensumList = await PensumModel.find().populate("semesters");
    res.json(pensumList);
  };

  createPensum = async (req: Request, res: Response) => {
    const [error, createPensumDto] = CreatePensumDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const pensumExists = await PensumModel.findOne({
      $or: [
        {career: createPensumDto?.career},
        {university: createPensumDto?.university}
      ]
    })
    if (pensumExists)
      return res.status(400).json({error: `Pensum with ${JSON.stringify(createPensumDto)} already exists`})

    const pensum = await PensumModel.create(createPensumDto);
    await pensum.save();
    res.json(pensum);
  };

  updatePensum = (req: Request, res: Response) => {
    res.json("updatePensum");
  };

  deletePensum = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedPensum = await PensumModel.findByIdAndDelete(id);

    if (!deletedPensum)
      return res.status(404).json({ error: `Pensum with id ${id} not found` });
    res.json(deletedPensum);
  };
}
