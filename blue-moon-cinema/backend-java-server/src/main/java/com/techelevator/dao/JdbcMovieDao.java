package com.techelevator.dao;

import com.techelevator.model.Movie;
import com.techelevator.model.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class JdbcMovieDao implements MovieDao {
    private final JdbcTemplate jdbcTemplate;

    public JdbcMovieDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Movie> findAll() {
        List<Movie> movies = new ArrayList<>();
        String sql = "SELECT * FROM movies";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()) {
            Movie movie = mapRowToMovie(results);
            movies.add(movie);
        }
        return movies;
    }

    @Override
    public Movie getMovieById(int movieId) {
        String sql = "SELECT * FROM movies WHERE movie_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, movieId);
        if (results.next()) {
            return mapRowToMovie(results);
        } else {
            return null;
        }
    }

    @Override
    public Movie getMovieByShowtimeId(int showtimeId) {
        String sql = "SELECT * " +
                "FROM movies INNER JOIN showtimes " +
                "ON movies.movie_id = showtimes.movie_id " +
                "WHERE showtimes.showtime_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, showtimeId);
        if (results.next()) {
            return mapRowToMovie(results);
        } else {
            return null;
        }
    }

//    @Override
//    public List<Movie> getMovieById(int movieId) {
//        String sql = "SELECT * " +
//                "FROM movies INNER JOIN showtimes " +
//                "ON movies.movie_id = showtimes.movie_id " +
//                "WHERE movies.movie_id = ?";
//        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, movieId);
//        while (results.next()) {
//            Movie movie = mapRowToMovie(results);
//            movies.add(movie);
//        }
//        return movies;
//    }

    @Override
    public Movie getMovieByTitle(String title) {
        String sql = "SELECT * FROM movies WHERE title = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, title);
        if (results.next()) {
            return mapRowToMovie(results);
        } else {
            return null;
        }
    }

    private Movie mapRowToMovie(SqlRowSet results) {
        Movie movie = new Movie();
        movie.setMovieId(results.getInt("movie_id"));
        movie.setTitle(results.getString("title"));
        movie.setGenre(results.getString("genre"));
        movie.setDescription(results.getString("description"));
        movie.setPoster_img(results.getString("poster_img"));
        movie.setRating(results.getString("rating"));
        movie.setRuntime(results.getInt("runtime"));
        return movie;
    }
}
