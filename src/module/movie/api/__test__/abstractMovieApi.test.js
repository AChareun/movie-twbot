/* eslint-disable max-classes-per-file */
const AbstractMovieApi = require('../abstractMovieApi');
const AbstractMovieApiError = require('../error/abstractMovieApiError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test("AbstractMovieApi can't be instantiated", () => {
    let apiInstance;
    try {
        apiInstance = new AbstractMovieApi();
    } catch (error) {
        expect(error).toBeInstanceOf(AbstractMovieApiError);
    } finally {
        expect(apiInstance).toBeUndefined();
    }
});

test('A concrete implementation that inherits from AbstractMovieApi can be instantiated', () => {
    const ConcreteMovieApi = class extends AbstractMovieApi {};
    const movieApiInstance = new ConcreteMovieApi();

    expect(movieApiInstance).toBeInstanceOf(ConcreteMovieApi);
    expect(movieApiInstance).toBeInstanceOf(AbstractMovieApi);
});

test("Abstract methods can't be called without concrete implementation", () => {
    const ConcreteMovieApi = class extends AbstractMovieApi {};
    const movieApiInstance = new ConcreteMovieApi();

    expect(() => movieApiInstance.getMovieData()).rejects.toThrowError(MethodNotImplementedError);
});
