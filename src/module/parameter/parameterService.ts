import { InvalidParameterError } from './error/invalidParameterError';
import { InvalidValueError } from './error/invalidValueError';
import { IApiParameter } from './IApiParameter';

export class ParameterService {
    validParams: IApiParameter[];

    validateParams(params: string[][], validParams: IApiParameter[]): string[][] {
        this.validParams = validParams;
        return params.map((param) => this.checkParam(param));
    }

    private checkParam(param: string[]): string[] {
        const { validParams } = this;
        const paramToValidate = param;

        const paramIndex = validParams.findIndex((item) => item.name === paramToValidate[0]);
        if (paramIndex === -1) {
            throw new InvalidParameterError();
        }

        let valueIndex = null;
        if (validParams[paramIndex].apiData.length) {
            const { apiData } = validParams[paramIndex];
            valueIndex = apiData.findIndex(
                (item: { name: string }) => item.name === paramToValidate[1]
            );

            if (valueIndex === -1) {
                throw new InvalidValueError();
            }
        }

        return this.formatParam(paramToValidate, paramIndex, valueIndex);
    }

    private formatParam(param: string[], paramIndex: number, valueIndex: number | null): string[] {
        const { validParams } = this;
        const formattedParam = [];

        formattedParam[0] = validParams[paramIndex].queryFormat;

        if (valueIndex) {
            const { apiData } = validParams[paramIndex];
            formattedParam[1] = apiData[valueIndex].value;
        } else {
            formattedParam[1] = param[1];
        }

        return formattedParam;
    }

}
