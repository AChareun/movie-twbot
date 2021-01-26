import { InvalidParameterError } from '../error/invalidParameterError';
import { InvalidValueError } from '../error/invalidValueError';
import { IApiParameter } from '../IApiParameter';
import { ParameterService } from '../parameterService';

const validParamsMock: IApiParameter[] = [
    {
        id: 1,
        name: 'mockParam',
        queryFormat: 'mockParam=',
        apiData: [
            {
                id: 1,
                name: 'mockValueA',
                value: '10',
            },
            {
                id: 2,
                name: 'mockValueB',
                value: '20',
            },
        ],
    },
    {
        id: 2,
        name: 'mockParam2',
        queryFormat: 'mockParam2=',
        apiData: [],
    },
];

const parameterServiceTest = new ParameterService();

test('validateParams method should not throw exceptions when params are correct', () => {
    const validParams = [
        ['mockParam', 'mockValueB'],
        ['mockParam2', 'mockValue'],
    ];

    const validatedParams = parameterServiceTest.validateParams(validParams, validParamsMock);

    expect(validatedParams).toEqual([
        ['mockParam=', '20'],
        ['mockParam2=', 'mockValue'],
    ]);
});

test('validateParams methos should throw a specific exception when params or values are invalid', () => {
    const invalidParam = [['invalidParam']];
    try {
        parameterServiceTest.validateParams(invalidParam, validParamsMock);
    } catch (error) {
        expect(error).toBeInstanceOf(InvalidParameterError);
    }

    const invalidValue = [['mockParam', 'invalidValue']];
    try {
        parameterServiceTest.validateParams(invalidValue, validParamsMock);
    } catch (error) {
        expect(error).toBeInstanceOf(InvalidValueError);
    }
})

