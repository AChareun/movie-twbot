module.exports = class ParameterService {
    /**
     * @param {JSON} validParams
     */
    constructor(validParams) {
        this.validParams = validParams;
    }

    /**
     * @param {Array<Array>} params
     * @returns {Array} Array with valid params
     */
    validateParams(params) {
        return params.map((param) => this.checkParam(param));
    }

    /**
     * @param {Array} param key-value pair
     */
    checkParam(param) {
        const { validParams } = this;
        const paramToValidate = param;

        const paramIndex = validParams.findIndex((item) => item.param === paramToValidate[0]);
        if (paramIndex === -1) {
            throw new Error('invalid parameter');
        }

        paramToValidate[0] = validParams[paramIndex].apiFormat;

        if (validParams[paramIndex].apiData) {
            const { apiData } = validParams[paramIndex];
            const valueIndex = apiData.findIndex((item) => item.name === paramToValidate[1]);

            if (valueIndex === -1) {
                throw new Error('invalid value');
            }
            paramToValidate[1] = apiData[valueIndex].value;
        }

        return [...paramToValidate];
    }
};
