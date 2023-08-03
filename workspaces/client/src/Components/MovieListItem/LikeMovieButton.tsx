import React from "react";
import {Movie} from "@scribbr-assessment-full-stack/common";

export type LikeMovieCallback = (movie: Movie) => void;

interface LikeMovieButtonProps {
    movie: Movie;
    addToLikes: LikeMovieCallback;
}

export function LikeMovieButton({movie, addToLikes}: LikeMovieButtonProps): JSX.Element {

    return (
        <button
            onClick={() => addToLikes(movie)}
            type={"button"}
            className={"rounded text-sm px-4 py-2 bg-slate-800 hover:bg-slate-600 transition-colors ease-linear duration-200 text-white font-bold"}>
            Add to List
        </button>
    )
}