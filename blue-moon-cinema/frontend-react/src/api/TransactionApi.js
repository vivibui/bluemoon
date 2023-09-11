import { utilFetchWrapper } from "../services/utilFetchWrapper";
const fetchWrapper = utilFetchWrapper();

export function getTransactionHistoryByUserId(userId){    
    return fetchWrapper.get(`/transactionhistory/${userId}`);
}

export function createTransaction(transaction){
    return fetchWrapper.post(`/reservation/`, transaction);
}

export function updateSeatingChart(seating_number, reservationId){
    return fetchWrapper.put(`/seating/${reservationId}`, seating_number);
}

export function getOccupiedSeating(showtimeId){
    return fetchWrapper.get(`/seating/showtime/${showtimeId}`);
}

export function getReservationAllInfo(reservationId){
    return fetchWrapper.get(`/seating/${reservationId}`)
}

export function reserveConfirmation(reservationId){
    return fetchWrapper.get(`/confirmation/${reservationId}`)
}