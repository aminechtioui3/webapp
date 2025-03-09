export class ResponseModel<T> {
    status: boolean;

    errorMsg?: string;

    displayMsg?: string;

    data: T;

    constructor(status: boolean, data: T, errorMsg?: string, displayMsg?: string) {
        this.status = status;
        this.data = data;
        this.errorMsg = errorMsg;
        this.displayMsg = displayMsg;
    }

    static fromJson<T>(json: any): ResponseModel<T> {
        return new ResponseModel<T>(
            json.status,
            json.data,
            json.errorMsg,
            json.displayMsg
        );
    }

    toJson(): any {
        return {
            status: this.status,
            data: this.data,
            errorMsg: this.errorMsg,
            displayMsg: this.displayMsg
        };
    }
}

export default ResponseModel;
