import {ApiMovieLookupDto, APP_TITLE, Movie} from "@scribbr-assessment-full-stack/common";
import {SearchBox} from "@scribbr-assessment-full-stack/client/src/Components/SearchBox";
import {LikedMovies} from "@scribbr-assessment-full-stack/client/src/Components/LikedMovies";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {QueryEnums} from "@scribbr-assessment-full-stack/client/src/Constants/QueryEnums";

export default function Home() {
    const {data : movieList, } = useQuery({
        queryKey: [QueryEnums.LIKED_MOVIES],
        queryFn: async (): Promise<Movie[]> => {
            const res = await fetch(`/movie/my-likes`);
            const data: Movie[] = await res.json();

            return data;
        }
    });

    return (
        <>
            <main className={"overscroll-none h-screen w-screen bg-gray-100 px-4 py-2 md:px-6 md:py-10 flex md:justify-center"}>
                <div className="w-full md:w-1/2 flex flex-col px-4 md:px-8 py-4 md:items-center rounded border-4 md:border-2 border-violet-300 gap-8">
                    <h1 className={"text-xl w-full font-bold "}>{APP_TITLE}</h1>
                    <SearchBox likedMovies={movieList}/>
                    <LikedMovies movies={movieList}/>

                </div>
            </main>
        </>
    )
}