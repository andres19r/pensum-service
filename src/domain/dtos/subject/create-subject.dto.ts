import { Validators } from "../../../config/validators";

export class CreateSubjectDto {
  private constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly semesterId: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateSubjectDto?] {
    const { code, name, semesterId } = props;

    if (!code) return ["Missing code"];
    if (!name) return ["Missing name"];
    if (!semesterId) return ["Missing semesterId"];
    if (!Validators.isMongoID(semesterId)) return ["Invalid semester ID"];

    return [undefined, new CreateSubjectDto(code, name, semesterId)];
  }
}
