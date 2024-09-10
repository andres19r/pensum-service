import { Validators } from "../../../config/validators";

export class CreateSemesterDto {
  private constructor(
    public readonly num: number,
    public readonly pensumId: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateSemesterDto?] {
    const { num, pensumId } = props;

    if (!num) return ["Missing num"];
    if (!Validators.isMongoID(pensumId)) return ["Invalid Pensum ID"];

    return [undefined, new CreateSemesterDto(num, pensumId)];
  }
}
