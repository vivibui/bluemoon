package com.techelevator.controller;

import com.techelevator.dao.JdbcTransactionHistoryDao;
import org.springframework.web.bind.annotation.*;

import com.techelevator.model.TransactionHistory;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path="/api")
public class TransactionHistoryController {
    private JdbcTransactionHistoryDao jdbcTransactionHistoryDao;

    private TransactionHistoryController(JdbcTransactionHistoryDao jdbcTransactionHistoryDao){
        this.jdbcTransactionHistoryDao = jdbcTransactionHistoryDao;
    }
    @RequestMapping(value="/transactionhistory/{userId}", method = RequestMethod.GET)
    public List<TransactionHistory> getTransactionsByUserId(@PathVariable int userId){
        return jdbcTransactionHistoryDao.getTransactionsByUserId(userId);
    }

//    @RequestMapping (value="/reservation", method = RequestMethod.POST)
//    public TransactionHistory createNewTransaction(@RequestBody TransactionHistory transaction){
//        return jdbcTransactionHistoryDao.createTransaction(transaction);
//    }

    @RequestMapping (value="/reservation", method = RequestMethod.POST)
    public TransactionHistory createNewTransaction(@RequestBody TransactionHistory transaction){
        return jdbcTransactionHistoryDao.createTransaction(transaction);
    }



    @RequestMapping (value="/seating/{reservationId}", method = RequestMethod.GET)
    public TransactionHistory getReservationAllInfo(@PathVariable int reservationId){
        return jdbcTransactionHistoryDao.getAllTransactionByResId(reservationId);
    }

    @RequestMapping (value="/seating/showtime/{showtimeId}", method = RequestMethod.GET)
    public List<TransactionHistory> getOccupiedSeating (@PathVariable int showtimeId){
        return jdbcTransactionHistoryDao.getOccupiedSeatingbyReservation(showtimeId);
    }
    @RequestMapping (value ="/seating/{reservationId}", method = RequestMethod.PUT)
    public TransactionHistory updateSeatingNumber (@RequestBody String seating_number, @PathVariable int reservationId){
        return jdbcTransactionHistoryDao.updateSeatingChart(seating_number,reservationId);
    }

    @RequestMapping (value="/confirmation/{reservationId}", method = RequestMethod.GET)
    public TransactionHistory reservationConfirm(@PathVariable int reservationId){
        return jdbcTransactionHistoryDao.getReservationForConfirmation(reservationId);
    }

}
