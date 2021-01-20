import { MovieService } from '../../movie/service/movieService';
import { Movie } from '../../movie/entity/movie';

export class AnswerService {
    movieService: MovieService;

    constructor(movieService: MovieService) {
        this.movieService = movieService;
    }

    writeAnswer(movieData: Movie, isAPISource: boolean = true): string {
        if (!isAPISource) {
            const answerText = `Hubo un problema con la API, pero igual te dejo una recomendación 😊
'${movieData.title}'.
Estreno de ${movieData.releaseDate}.
Duración: ${movieData.runtime}.`;

            return answerText;
        }
        const answerText = `Hey, acá va una peli para vos 😊
'${movieData.title} (${movieData.originalTitle})'.
Estreno del ${movieData.releaseDate}.
Duración: ${movieData.runtime}.`;

        return answerText;
    }

    async getAnswer(request: string): Promise<string> {
        const movie = await this.movieService.getMovie(request);
        const answer = this.writeAnswer(movie);

        return answer;
    }
}
