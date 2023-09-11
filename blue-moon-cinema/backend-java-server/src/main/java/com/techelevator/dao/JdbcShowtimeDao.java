package com.techelevator.dao;


import com.techelevator.model.Movie;
import com.techelevator.model.Showtime;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcShowtimeDao implements ShowtimeDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcShowtimeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Showtime> getShowtimeByMovieId(int movieId) {
        String sql = "SELECT * FROM showtimes WHERE movie_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, movieId);
        List<Showtime> showtimes = new ArrayList<>();
        while (results.next()) {
            showtimes.add(mapRowToShowtime(results));
        }
        return showtimes;
    }

    @Override
    public Showtime getShowtimeAndTitleByShowtimeId(int showtimeId) {
        String sql = "SELECT showtimes.showtime_id, showtimes.movie_id, showtimes.show_date, showtimes.show_time, movies.title " +
                "FROM showtimes INNER JOIN movies " +
                "ON showtimes.movie_id = movies.movie_id " +
                "WHERE showtimes.showtime_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, showtimeId);
        if (results.next()) {
            return mapRowToShowtimeMovie(results);
        } else {
            return null;
        }
    }

    private Showtime mapRowToShowtime(SqlRowSet results) {
        Showtime showtime = new Showtime();
        showtime.setMovieId(results.getInt("movie_id"));
        showtime.setShowDate(results.getDate("show_date"));
        showtime.setShowTime(results.getTime("show_time"));
        showtime.setShowtimeId(results.getInt("showtime_id"));
        return showtime;
    }
    private Showtime mapRowToShowtimeMovie(SqlRowSet results) {
        Showtime showtime = new Showtime();
        showtime.setMovieId(results.getInt("movie_id"));
        showtime.setShowDate(results.getDate("show_date"));
        showtime.setShowTime(results.getTime("show_time"));
        showtime.setShowtimeId(results.getInt("showtime_id"));
        showtime.setMovieTitle(results.getString("title"));
        return showtime;
    }
}
