package com.techelevator.model;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public class TransactionHistory {

    private int reservationId;

    private String title;
    private Date showDate;
    private Time showTime;

    private int movieId;
    private int userId;
    private int showtimeId;
    private int num_tickets;
    private Timestamp reserve_time;
    private String customer_name;
    private String billing_address;

    private int zipcode;
    private String email_address;
    private Double total_cost;

    private String seating_number;

    public TransactionHistory(int reservationId, String title, Date showDate, Time showTime, int movieId, int userId, int showtimeId, int num_tickets, Timestamp reserve_time, String customer_name, String billing_address, int zipcode, String email_address, Double total_cost, String seating_number) {
        this.reservationId = reservationId;
        this.title = title;
        this.showDate = showDate;
        this.showTime = showTime;
        this.movieId = movieId;
        this.userId = userId;
        this.showtimeId = showtimeId;
        this.num_tickets = num_tickets;
        this.reserve_time = reserve_time;
        this.customer_name = customer_name;
        this.billing_address = billing_address;
        this.zipcode = zipcode;
        this.email_address = email_address;
        this.total_cost = total_cost;
        this.seating_number = seating_number;
    }

    public TransactionHistory(int reservationId, String title, Date showDate, Time showTime, int movieId, int userId, int showtimeId, int num_tickets, Timestamp reserve_time) {
        this.reservationId = reservationId;
        this.title = title;
        this.showDate = showDate;
        this.showTime = showTime;
        this.movieId = movieId;
        this.userId = userId;
        this.showtimeId = showtimeId;
        this.num_tickets = num_tickets;
        this.reserve_time = reserve_time;
    }

    public TransactionHistory() {
    }


    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(int showtimeId) {
        this.showtimeId = showtimeId;
    }

    public int getNum_tickets() {
        return num_tickets;
    }

    public void setNum_tickets(int num_tickets) {
        this.num_tickets = num_tickets;
    }

    public Timestamp getReserve_time() {
        return reserve_time;
    }

    public void setReserve_time(Timestamp reserve_time) {
        this.reserve_time = reserve_time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getShowDate() {
        return showDate;
    }

    public void setShowDate(Date showDate) {
        this.showDate = showDate;
    }

    public Time getShowTime() {
        return showTime;
    }

    public void setShowTime(Time showTime) {
        this.showTime = showTime;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public String getBilling_address() {
        return billing_address;
    }

    public void setBilling_address(String billing_address) {
        this.billing_address = billing_address;
    }

    public int getZipcode() {
        return zipcode;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    public String getEmail_address() {
        return email_address;
    }

    public void setEmail_address(String email_address) {
        this.email_address = email_address;
    }

    public Double getTotal_cost() {
        return total_cost;
    }

    public void setTotal_cost(Double total_cost) {
        this.total_cost = total_cost;}

    public String getSeating_number() {
        return seating_number;
    }

    public void setSeating_number(String seating_number) {
        this.seating_number = seating_number;
    }


    @Override
    public String toString() {
        return "Reservation{" +
                "reservationId=" + reservationId +
                ", movieId=" + movieId +
                ", userId=" + userId +
                ", showtimeId=" + showtimeId +
                ", tickets=" + num_tickets +
                ", seating_number=" + seating_number +
                '}';
    }



}
