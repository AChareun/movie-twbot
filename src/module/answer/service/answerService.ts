import { MovieService } from '../../movie/service/movieService';
import { Movie } from '../../movie/entity/movie';
import { SuccessTwitAnswer, FallbackTwitAnswer, ErrorTwitAnswer } from '../twitAnswer';

export class AnswerService {
    movieService: MovieService;

    constructor(movieService: MovieService) {
        this.movieService = movieService;
    }

    async getAnswer(request: string): Promise<string> {
        let answer = '';

        try {
            const movie = await this.movieService.getMovie(request);
            answer = this.writeAnswer(movie);
        } catch (error) {
            answer = new ErrorTwitAnswer(error).getMessage();
        }

        return answer;
    }

    writeAnswer(movieData: Movie, isAPISource: boolean = true): string {
        if (!isAPISource) {
            const answerText = new FallbackTwitAnswer(movieData).getMessage();

            return answerText;
        }

        const answerText = new SuccessTwitAnswer(movieData).getMessage();

        return answerText;
    }
}
