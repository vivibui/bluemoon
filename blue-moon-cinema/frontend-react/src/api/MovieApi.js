import { utilFetchWrapper } from "../services/utilFetchWrapper";
const fetchWrapper = utilFetchWrapper();

export function getMoviesForYou(){
    return fetchWrapper.get('/movies');
}

export function getMovieList(searchString){
    searchString = searchString.toLowerCase();
    let localMovies = getMoviesForYou().filter((movie)=>{
                return movie.title.toLowerCase().includes(searchString) || 
                        movie.overview.toLowerCase().includes(searchString) || 
                        movie.tagline.toLowerCase().includes(searchString) || 
                        movie.directorName.toLowerCase().includes(searchString);
            });
    return localMovies;
}

export function getMovieDetail(movieId){
    return fetchWrapper.get(`/movies/${movieId}`)
}





