import { HttpCode } from '../../enums/http-code/http-code';

export interface RestError {
    message: string;
    status: HttpCode;
}
