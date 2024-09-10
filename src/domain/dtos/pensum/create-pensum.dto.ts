export class CreatePensumDto {
  private constructor(
    public readonly career: string,
    public readonly university: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreatePensumDto?] {
    const { career, university } = props;

    if (!career) return ["Career property is required"];
    if (!university) return ["Career property is required"];

    return [undefined, new CreatePensumDto(career, university)];
  }
}
