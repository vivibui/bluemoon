package com.techelevator.dao;
import com.techelevator.model.Movie;
import java.util.List;
public interface MovieDao {
    List<Movie> findAll();

    Movie getMovieById(int movieId);

    //List<Movie> getMovieAndShowtimeById(int movieId);

    Movie getMovieByShowtimeId(int showtimeId);
    Movie getMovieByTitle(String title);
}
