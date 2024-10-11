import { PensumModel } from "../../data/mongo/models/pensum.model";
import { SubjectModel } from "../../data/mongo/models/subject.model";
import { CreateSubjectDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors/custom-error";

export class SubjectService {
  constructor() {}

  async createSubject(createSubjectDto: CreateSubjectDto) {
    try {
      const newSubject = new SubjectModel(createSubjectDto);

      const updatedPensum = await PensumModel.findByIdAndUpdate(
        createSubjectDto.pensumId,
        {
          $push: { subjects: newSubject._id },
        },
      );

      const pensum = await PensumModel.findById(newSubject.pensumId);
      if (!updatedPensum)
        throw CustomError.badRequest(
          `Pensum with id ${createSubjectDto.pensumId} not found`,
        );
      await newSubject.save();
      return newSubject;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getAllSubjects() {
    return await SubjectModel.find();
  }

  async getSubjectById(id: string) {
    return await SubjectModel.findById(id);
  }
}
