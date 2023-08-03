export interface OMDbRatingDto {
    "Source": string;
    "Value": string;
}

export interface OMDbSearchDto {
    "Search": OMDbMovieDto[],
    "totalResults": string,
    "Response": string,
}

export interface OMDbMovieDto {
    "Title": string,
    "Year": string,
    "imdbID": string,
    "Type": string,
    "Poster": string,
}

export interface OMDbMovieExtendedInfoDto extends OMDbMovieDto {
    "Rated": string,
    "Released": string,
    "Runtime": string,
    "Genre": string,
    "Director": string,
    "Writer": string,
    "Actors": string,
    "Plot": string,
    "Language": string,
    "Country": string,
    "Awards": string,
    "Ratings": OMDbRatingDto[],
    "Metascore": string;
    "imdbRating": string;
    "imdbVotes": string;
    "DVD": string;
    "BoxOffice": string;
    "Production": string;
    "Website": string;
    "Response": string;
}

export interface Movie {
    title: string;
    year: number;
    imdbID: string;
    type: string;
    poster: string;
    likes: MovieLike[];
}

export interface MovieExtendedInfo extends Movie {
    rated: string;
    released: number;
    runtime: number;
    genre: string[];
    director: string;
    writer: string[];
    actors: string[];
    plot: string;
    language: string[];
    country: string[];
    awards: string[];
    ratings: Rating[];
    metascore: number;
    imdbRating: number;
    imdbVotes: number;
    dvd: number;
    boxOffice: number;
    production: string;
    website: string;
    response: boolean;
    likes: MovieLike[];
}

export interface IMDBRating {
    source: 'Internet Movie Database';
    value: number;
}

export interface RottenTomatoesRating {
    source: 'Rotten Tomatoes';
    value: number;
}

export interface MetacriticRating {
    source: 'Metacritic';
    value: number;
}

export type Rating = IMDBRating | RottenTomatoesRating | MetacriticRating;

export interface MovieLike {
    id: string;
    date: number;
}

export interface ApiMovieLookupDto {
    movies: Movie[];
}