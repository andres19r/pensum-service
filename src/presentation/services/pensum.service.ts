import {CreatePensumDto, UpdatePensumDto} from "../../domain/dtos";
import {PensumModel} from "../../data/mongo/models/pensum.model";
import {CustomError} from "../../domain/errors/custom-error";

export class PensumService {
    async createPensum(createPensumDto: CreatePensumDto) {
        const pensum = await PensumModel.findOne();
        if (pensum)
            throw CustomError.badRequest('There is a pensum already created')

        try {
            return await PensumModel.create(createPensumDto);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getPensum() {
        const pensum = await PensumModel.findOne();
        return pensum || {};
    }

    async modifyPensum(updatePensumDto: UpdatePensumDto) {
        const pensum = await PensumModel.findOne();
        if (!pensum)
            throw CustomError.notFound(`There is not a pensum created`)

        try {
            return await PensumModel.findOneAndUpdate({}, updatePensumDto, {new: true})
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}
