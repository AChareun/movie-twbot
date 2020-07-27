import genres from './genres';
import paramList from './params';

const getGenreId = (param) => {
  const genre = param.toLowerCase();

  const genreIndex = genres.findIndex((gen) => gen.name === genre);
  if (genreIndex === -1) throw new Error('invalid genre');

  const genreID = genres[genreIndex].id;

  return genreID;
};

const formatParams = (param) => {
  const newParam = param;
  const paramIndex = paramList.findIndex((item) => item.param === newParam[0]);

  if (paramIndex === -1) throw new Error('invalid parameter');

  if (newParam[0] === 'gen') {
    try {
      newParam[1] = getGenreId(newParam[1]);
    } catch (error) {
      throw new Error('invalid genre');
    }
  }
  newParam[0] = paramList[paramIndex].format;

  return newParam.join('');
};

const getParams = (tweetText) => {
  const tweetParams = tweetText.split('/').map((param) => param.split(':'));

  try {
    const FORMATED_PARAMS = tweetParams.map((param) => formatParams(param));
    return FORMATED_PARAMS.join('&');
  } catch (error) {
    throw new Error('invalid parameter');
  }
};

export default getParams;
