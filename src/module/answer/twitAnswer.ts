import { Movie } from "../movie/entity/movie";

export interface ITwitAnswer {
    message: string;
    getMessage(): string;
}

export class SuccessTwitAnswer implements ITwitAnswer {
    movieData: Movie;
    message: string;

    constructor(movieData: Movie) {
        this.movieData = movieData;
    }

    getMessage() {
        const { movieData } = this;

        this.message = `Hey, acá va una peli para vos 😊
        '${movieData.title} (${movieData.originalTitle})'.
        Estreno del ${movieData.releaseDate}.
        Duración: ${movieData.runtime}.`;

        return this.message;
    }

}

export class FallbackTwitAnswer implements ITwitAnswer {
    movieData: Movie;
    message: string;

    constructor(movieData: Movie) {
        this.movieData = movieData;
    }

    getMessage() {
        const { movieData } = this;

        this.message = `Hubo un problema con la API, pero igual te dejo una recomendación 😊
        '${movieData.title}'.
        Estreno de ${movieData.releaseDate}.
        Duración: ${movieData.runtime}.`;

        return this.message;
    }

}

export class ErrorTwitAnswer implements ITwitAnswer {
    error: Error;
    message: string;

    constructor(error: Error) {
        this.error = error;
    }

    getMessage() {
        const { error } = this;

        this.message = `Hubo un problema al procesar tu pedido 😢:
        ${error.message}`;

        return this.message;
    }

}
