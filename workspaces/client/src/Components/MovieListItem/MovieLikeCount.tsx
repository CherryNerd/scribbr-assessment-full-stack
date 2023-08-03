import React from "react";
import {HeartIcon} from "@heroicons/react/24/solid";
import {Movie} from "@scribbr-assessment-full-stack/common";

interface LikeCountProps {
    movie: Movie;
}

export function MovieLikeCount({movie}: LikeCountProps): JSX.Element {

    return (
        <div
            className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-none flex flex-row justify-between gap-1 items-center"}>
            <HeartIcon className={"h-4 w-4"}/>
            <span className={"text-gray-50"}>
                            {movie.likes.length}
            </span>
        </div>
    )
}