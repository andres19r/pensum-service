import { Validators } from "../../../config/validators";

export class CreateSubjectDto {
  private constructor(
    public readonly name: string,
    public readonly semester: number,
    public readonly pensumId: string,
    public readonly score?: number,
    public readonly state?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateSubjectDto?] {
    const { name, semester, score, pensumId, state } = props;

    if (!name) return ["Missing name"];
    // TODO: check if state is a value from enum
    if (!semester) return ["Missing semester"];
    if (score && isNaN(score)) return ["Score shold be a number"];
    if (!pensumId) return ["Missing pensumId"];
    if (!Validators.isMongoID(pensumId)) return ["Invalid pensum ID"];

    return [
      undefined,
      new CreateSubjectDto(name, semester, pensumId, score, state),
    ];
  }
}
