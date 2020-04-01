import { MagicNumber } from './MagicNumber'

export class ResponseModel {
    status: boolean
    detail: any
    message: string
    Success(detail: any, message: string = "Success") {
        this.status = MagicNumber.success;
        this.detail = detail;
        this.message = message;
        return this;
    }

    Failed(detail: any, message: string) {
        this.status = MagicNumber.failed;
        this.detail = detail;
        this.message = message;
        return this;
    }
}
