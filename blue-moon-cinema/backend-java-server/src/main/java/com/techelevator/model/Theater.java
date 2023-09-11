package com.techelevator.model;

public class Theater {
    private int theaterId;
    private int showtimeId;
    private int movieId;

    public Theater(int theaterId, int showtimeId, int movieId) {
        this.theaterId = theaterId;
        this.showtimeId = showtimeId;
        this.movieId = movieId;
    }
    public int getTheaterId() {
        return theaterId;
    }

    public void setTheaterId(int theaterId) {
        this.theaterId = theaterId;
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
}
