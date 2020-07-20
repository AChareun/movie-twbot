import genres from "./genres";

const getParams = (tweetText) => {
  const tweetParams = tweetText.split("/").map((param) => param.split(":"));

  try {
    const FORMATED_PARAMS = tweetParams.map((param) => formatParams(param));
    return FORMATED_PARAMS.join("&");
  } catch (error) {
    throw error
  }
};

const formatParams = (param) => {
  const newParam = param;
  switch (newParam[0]) {
    case "gen":
      newParam[0] = "with_genres=";
      newParam[1] = getGenreId(newParam[1]);
      break;
    case "estreno":
      newParam[0] = "year=";
      break;
    case "idioma":
      newParam[0] = "with_original_language=";
      break;
    default:
      throw new Error('invalid parameter');
  }

  return newParam.join("");
};

const getGenreId = (genre) => {
  const genreIndex = genres.findIndex((gen) => gen.name === genre);
  const genreID = genres[genreIndex].id;

  return genreID;
};

export default getParams;
