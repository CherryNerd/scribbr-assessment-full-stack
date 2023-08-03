import {PojosMetadataMap} from "@automapper/pojos";
import {Movie, OMDbMovieDto, OMDbRatingDto, Rating} from "@scribbr-assessment-full-stack/common";
import {MovieMap} from "@scribbr-assessment-full-stack/server/src/lib/mappings/ModelEnum";

export function createMovieMetadata() {
    PojosMetadataMap.create<OMDbMovieDto>(MovieMap.OMDbMovieDto, {
        Title: String,
        Year: String,
        Poster: String,
        imdbID: String,
        Type: String,
    })

    PojosMetadataMap.create<Movie>(MovieMap.Movie, {
        title: String,
        year: Number,
        poster: String,
        imdbID: String,
        type: String,
    })
}