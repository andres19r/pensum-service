import { isValidObjectId } from "mongoose";
import { Validators } from "../../../config/validators";

export class UpdateSemesterDto {
  private constructor(
    public readonly num?: number,
    public readonly pensumId?: string,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.num) returnObj.num = this.num;
    if (this.pensumId) returnObj.pensumId = this.pensumId;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateSemesterDto?] {
    const { num, pensumId } = props;

    if (num && isNaN(num)) return ["num must be a number"];
    if (pensumId && !Validators.isMongoID(pensumId)) return ["pensumId must be a valid id"];

    return [undefined, new UpdateSemesterDto(num, pensumId)];
  }
}
