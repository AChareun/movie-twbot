import getParams from './utils/get-params';
import getMovieData from './services/movie';


const writeAnswer = (movieData, isAPISource) => {

  if (!isAPISource) {
    const answerText = `Hubo un problema con la API, pero igual te dejo una recomendación :)
'${movieData.title}'.
Estreno del ${movieData.release_date}.
Duración: ${movieData.runtime}.`;

    return answerText 

  } else {
    const answerText = `Hey, acá va una peli para vos :)
'${movieData.title}'.
Estreno del ${movieData.release_date}.
Duración: ${movieData.runtime}.`;

    return answerText;
  }
}

const writeErrorAnswer = () => {
  const errorText = `Disculpá, puede que no hayas respetado el formato de petición. Volvé a intentarlo y recordá que el formato es parametro:valor/parametro:valor`;
  
  return errorText
}

const buildAnswer = async (tweetText) => {
  const validRegExp = /^([A-z]{2,}\:[A-z\d]{2,}\/*){1,3}$/;
  if (!new RegExp(validRegExp).test(tweetText)) {
    return writeErrorAnswer();
  }

  const searchParams = getParams(tweetText);

  const [movieData, isAPISource] = await getMovieData(searchParams);

  const tweetAnswer = writeAnswer(movieData, isAPISource);

  return tweetAnswer;
}

export default buildAnswer;
