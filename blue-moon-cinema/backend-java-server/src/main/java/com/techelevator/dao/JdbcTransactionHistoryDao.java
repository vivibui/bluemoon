package com.techelevator.dao;

import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import com.techelevator.model.TransactionHistory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Component
public class JdbcTransactionHistoryDao implements TransactionHistoryDao{


    private final JdbcTemplate jdbcTemplate;

    private JdbcMovieDao jdbcmovieDao;
    private JdbcShowtimeDao jdbcShowtimeDao;

    public JdbcTransactionHistoryDao(JdbcTemplate jdbcTemplate, JdbcMovieDao jdbcmovieDao, JdbcShowtimeDao jdbcShowtimeDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.jdbcmovieDao = jdbcmovieDao;
        this.jdbcShowtimeDao = jdbcShowtimeDao;
    }
    @Override
    public List<TransactionHistory> getTransactionsByUserId(int userId) {
        String sql = "SELECT m.title, t.reservation_id, t.num_tickets, s.show_date, s.show_time, t.reserve_time, t.seating_number, t.total_cost " +
                "FROM transactionhistory AS t INNER JOIN users AS u " +
                "ON t.user_id = u.user_id INNER JOIN movies AS m " +
                "ON m.movie_id = t.movie_id INNER JOIN showtimes AS s " +
                "ON s.showtime_id = t.showtime_id " +
                "WHERE t.user_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        List<TransactionHistory> transactions = new ArrayList<>();
        while (results.next()) {
            transactions.add(mapRowToTransaction(results));
        }
        return transactions;

    }


    @Override
    public TransactionHistory getTransactionByResId(int resId){
        String sql = "SELECT movie_id, user_id, showtime_id, num_tickets, customer_name, billing_address, zipcode, email_address, total_cost, seating_number, reservation_id " +
                "FROM transactionhistory WHERE reservation_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, resId);
        if (results.next()) {
            return (mapRowToTransactionForSeating(results));
        }else{
            return null;
        }

    }

    @Override
    public TransactionHistory getAllTransactionByResId(int resId){
        String sql = "SELECT * FROM transactionhistory WHERE reservation_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, resId);
        if (results.next()) {
            return (mapRowToTransactionForSeating(results));
        }else{
            return null;
        }

    }

    @Override
    public TransactionHistory getReservationForConfirmation(int resId){
        String sql = "SELECT m.title, t.reservation_id, t.num_tickets, t.customer_name, t.billing_address, " +
                    "t.email_address, t.zipcode, t.total_cost,  t.seating_number, s.show_date, s.show_time, t.reserve_time " +
                    "                FROM transactionhistory AS t INNER JOIN users AS u " +
                    "                ON t.user_id = u.user_id INNER JOIN movies AS m " +
                    "                ON m.movie_id = t.movie_id INNER JOIN showtimes AS s " +
                    "                ON s.showtime_id = t.showtime_id " +
                    "                WHERE t.reservation_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, resId);
        if (results.next()) {
            return (mapRowToTransactionForConfirmation(results));
        }else{
            return null;
        }
    }


    @Override
    public TransactionHistory createTransaction(TransactionHistory transaction) {
        TransactionHistory newTransaction = null;
        String sql = "INSERT into transactionhistory (movie_id, user_id, showtime_id, num_tickets, customer_name, billing_address, zipcode, email_address, total_cost, seating_number) " +
                "values(?,?,?,?,?,?,?,?,?,?) " +
                "returning reservation_id;";

        int newResId = jdbcTemplate.queryForObject(sql, int.class, transaction.getMovieId(),
                transaction.getUserId(), transaction.getShowtimeId(), transaction.getNum_tickets(), transaction.getCustomer_name(),
                transaction.getBilling_address(), transaction.getZipcode(), transaction.getEmail_address(), transaction.getTotal_cost(), transaction.getSeating_number());
        newTransaction = getTransactionByResId(newResId);

        return newTransaction;
    }

    @Override
    public TransactionHistory updateSeatingChart(String seating_number, int reservationId){
        String sql = "UPDATE transactionhistory " +
                "SET seating_number = ? " +
                "WHERE reservation_id = ?";
        jdbcTemplate.update(sql, seating_number, reservationId);
        return getTransactionByResId(reservationId);
    }

    @Override
    public List<TransactionHistory> getOccupiedSeatingbyReservation(int showtimeId){
        String sql = "SELECT * FROM transactionhistory " +
                    "WHERE showtime_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, showtimeId);
        List<TransactionHistory> transactions = new ArrayList<>();
        while (results.next()) {
            transactions.add(mapRowToTransactionForSeating(results));
        }
        return transactions;
    }


    public TransactionHistory mapRowToTransactionForConfirmation(SqlRowSet results){
        TransactionHistory transactionHistory = new TransactionHistory();
        transactionHistory.setTitle(results.getString("title"));
        transactionHistory.setReservationId(results.getInt("reservation_id"));
        transactionHistory.setNum_tickets(results.getInt("num_tickets"));
        transactionHistory.setCustomer_name(results.getString("customer_name"));
        transactionHistory.setBilling_address(results.getString("billing_address"));
        transactionHistory.setZipcode(results.getInt("zipcode"));
        transactionHistory.setEmail_address(results.getString("email_address"));
        transactionHistory.setTotal_cost(results.getDouble("total_cost"));
        transactionHistory.setSeating_number(results.getString("seating_number"));
        transactionHistory.setShowDate(results.getDate("show_date"));
        transactionHistory.setShowTime(results.getTime("show_time"));
        transactionHistory.setReserve_time(results.getTimestamp("reserve_time"));
        return transactionHistory;
    }

    private TransactionHistory mapRowToTransactionForSeating (SqlRowSet results) {
        TransactionHistory transactionHistory = new TransactionHistory();
        transactionHistory.setMovieId(results.getInt("movie_id"));
        transactionHistory.setUserId(results.getInt("user_id"));
        transactionHistory.setShowtimeId(results.getInt("showtime_id"));
        transactionHistory.setNum_tickets(results.getInt("num_tickets"));
        transactionHistory.setCustomer_name(results.getString("customer_name"));
        transactionHistory.setBilling_address(results.getString("billing_address"));
        transactionHistory.setZipcode(results.getInt("zipcode"));
        transactionHistory.setEmail_address(results.getString("email_address"));
        transactionHistory.setTotal_cost(results.getDouble("total_cost"));
        transactionHistory.setSeating_number(results.getString("seating_number"));
        transactionHistory.setReservationId(results.getInt("reservation_id"));
        return transactionHistory;
    }

    private TransactionHistory mapRowToTransaction (SqlRowSet results) {
        TransactionHistory transactionHistory = new TransactionHistory();
        transactionHistory.setTitle(results.getString("title"));
        transactionHistory.setReservationId(results.getInt("reservation_id"));
        transactionHistory.setNum_tickets(results.getInt("num_tickets"));
//        transactionHistory.setCustomer_name(results.getString("customer_name"));
//        transactionHistory.setEmail_address(results.getString("email_address"));
//        transactionHistory.setBilling_address(results.getString("billing_address"));
//        transactionHistory.setZipcode(results.getInt("zipcode"));
        transactionHistory.setTotal_cost(results.getDouble("total_cost"));
        transactionHistory.setShowDate(results.getDate("show_date"));
        transactionHistory.setShowTime(results.getTime("show_time"));
        transactionHistory.setReserve_time(results.getTimestamp("reserve_time"));
        transactionHistory.setSeating_number(results.getString("seating_number"));
        return transactionHistory;
    }

}


