import fetch from 'node-fetch';
import {existsSync} from "node:fs";
import {mkdir, readFile, writeFile,} from 'node:fs/promises';
import {join} from "path";
import * as process from "process";
import {Movie, OMDbMovieDto, OMDbSearchDto} from "@scribbr-assessment-full-stack/common";
import {v4 as uuidv4} from 'uuid';
import {mapper} from "@scribbr-assessment-full-stack/server/src/lib/mappings/mapper";
import {MovieMap} from "@scribbr-assessment-full-stack/server/src/lib/mappings/ModelEnum";

const dataFolderPath = join(process.cwd(), 'data');

// Mock DB
const moviesPath = join(dataFolderPath, 'movies.json');

console.log('dataFolderPath', dataFolderPath);

export class MovieHandler {

    movies: Movie[] = [];

    // wss: WebSocketServer;

    async init() {
        if (!existsSync(dataFolderPath)) {
            await mkdir(dataFolderPath);
        }

        if (!existsSync(moviesPath)) {
            await this.save();
        } else {
            const moviesFileContent = await readFile(moviesPath, 'utf-8');
            this.movies = JSON.parse(moviesFileContent);
        }
    }

    private async save() {
        await writeFile(moviesPath, JSON.stringify(this.movies, null, 4), 'utf-8');
    }

    async voteOnMovie(inputMovie: Movie) {
        let movie: Movie | undefined = this.movies.find(q => {
            return q.title === inputMovie.title
                && q.year === inputMovie.year
                && q.poster === inputMovie.poster
                && q.type === inputMovie.type
        });
        if (!movie) {
            movie = inputMovie;
            this.movies.push(movie);
        }

        movie.likes.push({
            id: uuidv4(),
            date: Date.now()
        });

        await this.save();
        return movie;
    }

    getLikesForMovie(inputMovie: Movie) {
        const foundMovie: Movie | undefined = this.movies.find((q: Movie) => {
            return q.title === inputMovie.title
            && q.year === inputMovie.year
            && q.poster === inputMovie.poster
            && q.type === inputMovie.type
        });
        if (!foundMovie) {
            return [];
        }

        return foundMovie.likes;
    }

    async getLikedMovies() {
        return this.movies;
    }

    async lookupMovies(input: string) {
        try {
            const searchParams = new URLSearchParams();
            searchParams.append('apikey', '27e768e6');
            searchParams.append('s', input);

            const response = await fetch(`http://www.omdbapi.com/?${searchParams.toString()}`);
            const data: OMDbSearchDto = await response.json();

            console.log('data', data)

            return data.Search
                .map((movie: OMDbMovieDto): Movie => mapper.map<OMDbMovieDto, Movie>(movie, MovieMap.OMDbMovieDto, MovieMap.Movie))
                .map((movie: Movie) => {
                    movie.likes = this.getLikesForMovie(movie);
                    return movie;
                });
        } catch (e) {
            console.log('e', e)
            return []
        }
    }

}
