package com.techelevator.dao;
import com.techelevator.model.Showtime;
import java.util.List;
public interface ShowtimeDao {
    List<Showtime> getShowtimeByMovieId (int movieId);
    Showtime getShowtimeAndTitleByShowtimeId(int showtimeId);
}
