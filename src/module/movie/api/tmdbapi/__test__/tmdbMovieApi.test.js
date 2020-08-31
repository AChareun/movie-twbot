const TMDBMovieApi = require('../tmdbMovieApi');

const DATA_MOCK = {
  apiKey: 'apiKeyMock',
  baseUrl: 'baseUrlMock',
  baseParams: 'baseParamsMock',
  apiParams: [
    {
      id: 1,
      param: 'mockParam',
      apiFormat: 'with_mock=',
      apiData: [{ id: 1, name: 'mockName', value: 'mockValue' }],
    },
  ],
};

const testMovieApi = new TMDBMovieApi(DATA_MOCK);

test('calling getUrl with an id number should return an endpoint to a single movie', () => {
  const requestMock = [['mockParam', 'mockName']];
  const expectedUrl = 'baseUrlMock/movie/1?api_keyapiKeyMock&language=en-US';

  expect(testMovieApi.getUrl(requestMock, null, 1)).toEqual(expectedUrl);
});

test('calling getUrl a second time should not change this.params value', () => {
  const requestMock = [['mockParam2', 'mockName2']];
  const expectedParam = 'with_mock=mockValue';

  expect(testMovieApi.params).toEqual(expectedParam);
  testMovieApi.getUrl(requestMock, null, 1);
  expect(testMovieApi.params).toEqual(expectedParam);
});

test('calling getUrl with a page and no id as params should return an endpoint using discover', () => {
  const requestMock = [['mockParam', 'mockName']];
  const expectedUrl = 'baseUrlMock/discover/movie?api_keyapiKeyMock&with_mock=mockValue&page=1baseParamsMock';

  expect(testMovieApi.getUrl(requestMock, 1)).toEqual(expectedUrl);
});
