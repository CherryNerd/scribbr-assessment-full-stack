import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember, mapFrom,
    PascalCaseNamingConvention
} from "@automapper/core";
import {pojos} from "@automapper/pojos";
import {createMovieMetadata} from "@scribbr-assessment-full-stack/server/src/lib/mappings/MovieMap";
import {Movie, OMDbMovieDto} from "@scribbr-assessment-full-stack/common";
import {MovieMap} from "@scribbr-assessment-full-stack/server/src/lib/mappings/ModelEnum";

createMovieMetadata();

export const mapper = createMapper({
    strategyInitializer: pojos(),
    namingConventions: {
        source: new PascalCaseNamingConvention(),
        destination: new CamelCaseNamingConvention(),
    }
})

createMap<OMDbMovieDto, Movie>(
    mapper,
    MovieMap.OMDbMovieDto,
    MovieMap.Movie,
    forMember(
        (destination: Movie) => destination.year,
        mapFrom((source: OMDbMovieDto) => parseInt(source.Year))
    ),
    forMember(
        (destination: Movie) => destination.likes,
        mapFrom(() => [])
    )
)