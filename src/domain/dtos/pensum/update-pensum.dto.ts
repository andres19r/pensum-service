export class UpdatePensumDto {
  private constructor(
    public readonly career?: string,
    public readonly university?: string,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.career) returnObj.career = this.career;
    if (this.university) returnObj.university = this.university;
    return returnObj;
  }

  static create(props: { [key: string]: any }): UpdatePensumDto {
    const { career, university } = props;
    return new UpdatePensumDto(career, university);
  }
}
