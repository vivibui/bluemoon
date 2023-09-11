package com.techelevator.model;

import java.sql.Time;
import java.util.Date;

public class Showtime {
    private int showtimeId;
    private int movieId;
    private Date showDate;
    private Time showTime;
    private String movieTitle;
    private String seating_numbers;

    public Showtime(int showtimeId, int movieId, Date showDate, Time showTime) {
        this.showtimeId = showtimeId;
        this.movieId = movieId;
        this.showDate = showDate;
        this.showTime = showTime;
    }

    public Showtime(int showtimeId, int movieId, Date showDate, Time showTime, String movieTitle) {
        this.showtimeId = showtimeId;
        this.movieId = movieId;
        this.showDate = showDate;
        this.showTime = showTime;
        this.movieTitle = movieTitle;
    }

    public Showtime() {

    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public int getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(int showtimeId) {
        this.showtimeId = showtimeId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
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

    @Override
    public String toString() {
        return "Showtime{" +
                "showtimeId=" + showtimeId +
                ", movieId=" + movieId +
                ", showDate=" + showDate +
                ", showTime=" + showTime +
                '}';
    }

}
