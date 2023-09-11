import { utilFetchWrapper } from "../services/utilFetchWrapper";
const fetchWrapper = utilFetchWrapper();


export function getShowtimes(movieId){
    return fetchWrapper.get(`/showtime/${movieId}`)
}

export function getShowtimeByShowtimeId(showtimeId){
    return fetchWrapper.get(`/reservation/${showtimeId}`)
}



