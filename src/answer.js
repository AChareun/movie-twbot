import getParams from './utils/get-params';
import getMovieData from './services/movie';


const writeAnswer = (movieData, isAPISource) => {

  if (!isAPISource) {
    const answerText = `Hubo un problema con la API, pero igual te dejo una recomendación 😊
'${movieData.title}'.
Estreno del ${movieData.release_date}.
Duración: ${movieData.runtime}.`;

    return answerText 

  } else {
    const answerText = `Hey, acá va una peli para vos 😊
'${movieData.title}'.
Estreno del ${movieData.release_date}.
Duración: ${movieData.runtime}.`;

    return answerText;
  }
}

const writeErrorAnswer = (error) => {
  if (error === 'bad format') {
    const errorText = `Disculpá, puede que no hayas respetado el formato de petición 😅. Volvé a intentarlo y recordá que el formato es parametro:valor/parametro:valor`;

    return errorText;

  } else if (error === 'wrong param') {
    const errorText = 'Whoops, quizás tu petición incluía parametros no soportados. Acá te dejo una lista de los parámetros válidos para que vuelvas a intentarlo 😊';

    return errorText;
  }
}

const buildAnswer = async (tweetText) => {
  const validRegExp = /^([A-z]{2,}\:[A-z\d]{2,}\/*){1,3}$/;
  if (!new RegExp(validRegExp).test(tweetText)) {
    return writeErrorAnswer('bad format');
  }
  try {
    const searchParams = getParams(tweetText);
    const [movieData, isAPISource] = await getMovieData(searchParams);
    const tweetAnswer = writeAnswer(movieData, isAPISource);
    return tweetAnswer;    
  } catch (error) {
    return writeErrorAnswer('wrong param')
  }

}

export default buildAnswer;
