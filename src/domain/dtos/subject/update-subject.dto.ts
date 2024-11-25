export class UpdateSubjectDto {
    private constructor(
        public readonly name?: string,
        public readonly semester?: string,
        public readonly pensumId?: string,
        public readonly score?: number,
        public readonly state?: string,
    ) {
    }

    get values(): { [key: string]: any[] } {
        const returnObj: { [key: string]: any } = {};

        if (this.name) returnObj.name = this.name;
        if (this.semester) returnObj.semester = this.semester;
        if (this.pensumId) returnObj.pensumId = this.pensumId;
        if (this.score) returnObj.score = this.score;
        if (this.state) returnObj.state = this.state;
        return returnObj;
    }

    static create(props: { [key: string]: any }): UpdateSubjectDto {
        const {name, semester, pensumId, score, state} = props;
        return new UpdateSubjectDto(name, semester, pensumId, score, state);
    }
}