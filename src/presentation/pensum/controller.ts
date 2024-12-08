import { Request, Response } from "express";
import { PensumModel } from "../../data/mongo/models/pensum.model";
import { CreatePensumDto, UpdatePensumDto } from "../../domain/dtos";

export class PensumController {
  constructor() {}

  getPensumInfo = async (req: Request, res: Response) => {
    const pensum = await PensumModel.findOne().populate("subjects");
    return res.json(pensum);
  };

  createPensum = async (req: Request, res: Response) => {
    const [error, createPensumDto] = CreatePensumDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const pensumExists = await PensumModel.findOne({
      $or: [
        { career: createPensumDto?.career },
        { university: createPensumDto?.university },
      ],
    });
    if (pensumExists)
      return res.status(400).json({
        error: `Pensum with ${JSON.stringify(createPensumDto)} already exists`,
      });

    const pensum = await PensumModel.create(createPensumDto);
    await pensum.save();
    res.json(pensum);
  };

  updatePensum = async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatePensumDto = UpdatePensumDto.create(req.body);

    const modifiedPensum = await PensumModel.findByIdAndUpdate(
      id,
      { $set: updatePensumDto.values },
      { new: true },
    );
    if (!modifiedPensum)
      return res.status(400).json({ error: `Pensum with id ${id} not found` });

    res.json(modifiedPensum);
  };

  deletePensum = async (req: Request, res: Response) => {
    const id = req.params.id;

    const deletedPensum = await PensumModel.findOneAndDelete({ _id: id });
    if (!deletedPensum)
      return res.status(404).json({ error: `Pensum with id ${id} not found` });

    res.json(deletedPensum);
  };
}
