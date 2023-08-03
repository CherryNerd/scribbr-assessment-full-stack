import {Movie} from "@scribbr-assessment-full-stack/common";
import React from "react";
import {
    LikeMovieButton,
    LikeMovieCallback,
    MovieLikeCount
} from "@scribbr-assessment-full-stack/client/src/Components/MovieListItem";

interface MovieListItemProps {
    movie: Movie
}

interface LikedMovieProps {
    showLikes: true;
}

interface LookupMovieProps {
    addToLikes: LikeMovieCallback;
}

export function MovieListItem(props: MovieListItemProps & LikedMovieProps): JSX.Element;
export function MovieListItem(props: MovieListItemProps & LookupMovieProps): JSX.Element;
export function MovieListItem({movie, addToLikes, showLikes}: any): JSX.Element {

    return (
        <>
            <div className={"flex flex-row h-12 gap-2"}>
                <img src={movie.poster} className={"object-contain h-12 w-12"} alt={`${movie.title} poster`}/>
                <div className="flex flex-1 flex-col">
                    <span className={"font-bold text-base"}>{movie.title}</span>
                    <span className={"text-sm text-gray-700"}>{movie.year}</span>
                </div>
                <div>
                    {showLikes && <MovieLikeCount movie={movie}/>}
                    {addToLikes && <LikeMovieButton movie={movie} addToLikes={addToLikes}/>}
                </div>
            </div>
        </>
    )
}