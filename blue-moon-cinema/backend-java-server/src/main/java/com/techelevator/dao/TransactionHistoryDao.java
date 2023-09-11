package com.techelevator.dao;
import com.techelevator.model.TransactionHistory;
import java.util.List;

public interface TransactionHistoryDao {
    List<TransactionHistory> getTransactionsByUserId (int userId);
    TransactionHistory getTransactionByResId(int resId);
    TransactionHistory createTransaction(TransactionHistory transaction);
    TransactionHistory getAllTransactionByResId(int resId);
    TransactionHistory updateSeatingChart(String seating_number, int showtimeId);
    TransactionHistory getReservationForConfirmation(int resId);
    List<TransactionHistory> getOccupiedSeatingbyReservation (int reservationId);
}
