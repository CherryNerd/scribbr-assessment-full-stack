import React, {useCallback, useState} from "react";
import {Movie} from "@scribbr-assessment-full-stack/common";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Combobox, Transition} from "@headlessui/react";
import {MovieListItem} from "@scribbr-assessment-full-stack/client/src/Components/MovieListItem";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {useDebounce} from 'react-use';
import {QueryEnums} from "@scribbr-assessment-full-stack/client/src/Constants/QueryEnums";

interface SearchBoxProps {
    likedMovies: Movie[];
}

export function SearchBox({likedMovies}: SearchBoxProps): JSX.Element {
    const [query, setQuery] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>('');
    const [foundMovies, setFoundMovies] = useState<Movie[]>([]);
    const queryClient = useQueryClient();

    const likeMovieMutation = useMutation({
        mutationKey: ["like-movie"],
        mutationFn: async (movie: Movie): Promise<void> => {
            console.log('Liking movie: ', movie);

            await fetch(`/movie/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });

            queryClient.invalidateQueries([QueryEnums.LIKED_MOVIES]);
        }
    });

    const movieLookupMutation = useMutation({
        mutationKey: ["movie-lookup"],
        mutationFn: async (input: string): Promise<void> => {
            const res = await fetch(`/movie/lookup/${input}`);
            const data: Movie[] = await res.json();

            setFoundMovies(data);
        }
    })

    useDebounce(() => {
        movieLookupMutation.mutate(query);
    }, 1000, [query]);


    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, [movieLookupMutation]);

    return (
        <>
            <div className="group">
                <Combobox>

                    <div
                        className={"group-focus-within:bg-slate-400 transition-colors  flex flex-row w-full rounded border py-2 px-4 items-center gap-2 text-gray-900 ring-1 ring-inset ring-gray-300"}>
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-gray-50"
                                             aria-hidden="true"/>
                        <Combobox.Input
                            value={query} onChange={onInputChange}
                            type={"search"}
                            className={"group-focus-within:text-gray-50 flex-1 bg-transparent w-full focus:outline-none focus:ring-0"}
                        />
                    </div>

                    {/*<div className="relative mt-2 rounded-md shadow-sm">*/}
                    {/*    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">*/}
                    {/*    </div>*/}
                    {/*    <input*/}
                    {/*        type="search"*/}
                    {/*        name="search"*/}
                    {/*        id="search"*/}
                    {/*        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                    {/*        placeholder="Add your favorite movie"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Combobox.Options
                            className={"flex flex-col py-4 rounded group-focus-within:border-2 px-4 group-focus-within:border-violet-200 transition-colors  gap-4"}>
                            {foundMovies?.map((movie: Movie) => {
                                const foundMovie = likedMovies.find((q: Movie) => {
                                    return q.title === movie.title
                                    && q.year === movie.year
                                    && q.poster === movie.poster
                                    && q.type === movie.type
                                });
                                console.log('likedMovies: ', likedMovies, foundMovie)

                                return (
                                    <Combobox.Option value={movie.title} key={movie.title}>
                                        {
                                            foundMovie && foundMovie.likes.length > 0 ? <MovieListItem movie={movie} showLikes/>
                                                :
                                                <MovieListItem movie={movie} addToLikes={likeMovieMutation.mutate}/>
                                        }
                                    </Combobox.Option>
                                )
                            })}
                        </Combobox.Options>
                    </Transition>
                </Combobox>
            </div>
        </>
    )

}