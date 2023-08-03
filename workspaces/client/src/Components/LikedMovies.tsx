import React from "react";
import {Movie} from "@scribbr-assessment-full-stack/common";
import {MovieListItem} from "@scribbr-assessment-full-stack/client/src/Components/MovieListItem";

interface LikedMoviesProps {
    movies: Movie[];
}

export function LikedMovies({movies}: LikedMoviesProps): JSX.Element {


    const movieItems = movies?.map((movie: Movie) => {
        return <MovieListItem movie={movie} key={movie.imdbID} showLikes/>
    })

    return (
        <>
            <div className={"flex flex-col w-full"}>
                {movieItems}
            </div>
        </>
    )
}