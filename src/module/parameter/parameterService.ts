export class ParameterService {
    validParams: Array<IApiParameter>;

    validateParams(params: Array<Array<string>>, validParams: Array<any>): Array<any> {
        this.validParams = validParams;
        return params.map((param) => this.checkParam(param));
    }

    private checkParam(param: Array<string>): Array<string> {
        const { validParams } = this;
        const paramToValidate = param;

        const paramIndex = validParams.findIndex((item) => item.name === paramToValidate[0]);
        if (paramIndex === -1) {
            throw new Error('invalid parameter');
        }

        paramToValidate[0] = validParams[paramIndex].queryFormat;

        if (validParams[paramIndex].apiData) {
            const { apiData } = validParams[paramIndex];
            const valueIndex = apiData.findIndex(
                (item: { name: any }) => item.name === paramToValidate[1]
            );

            if (valueIndex === -1) {
                throw new Error('invalid value');
            }
            paramToValidate[1] = apiData[valueIndex].value;
        }

        return [...paramToValidate];
    }
}
