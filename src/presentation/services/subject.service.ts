import { PensumModel } from "../../data/mongo/models/pensum.model";
import { SubjectModel } from "../../data/mongo/models/subject.model";
import { CreateSubjectDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors/custom-error";
import { UpdateSubjectDto } from "../../domain/dtos/subject/update-subject.dto";

export class SubjectService {

  async createSubject(createSubjectDto: CreateSubjectDto) {
    try {
      const newSubject = await SubjectModel.create(createSubjectDto);

      const pensum = await PensumModel.findById(newSubject.pensumId);
      if (!pensum)
        return CustomError.badRequest(
          `Pensum with id ${createSubjectDto.pensumId} not found`,
        );

      await PensumModel.findByIdAndUpdate(
        createSubjectDto.pensumId,
        {
          $push: { subjects: newSubject._id },
        },
      );
      return newSubject;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getAllSubjects() {
    return SubjectModel.find();
  }

  async getSubjectById(id: string) {
    return SubjectModel.findById(id);
  }

  async modifySubjectById(id: string, updateSubjectDto: UpdateSubjectDto) {
    const subject = await SubjectModel.findById(id);
    if (!subject) return CustomError.notFound(`Subject with id ${id} not found`);

    try {
      return await SubjectModel.findByIdAndUpdate(id, updateSubjectDto.values, {
        new: true,
      });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async deleteSubject(id: string) {
    return SubjectModel.findByIdAndDelete(id);
  }
}
