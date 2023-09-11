package com.techelevator.controller;

import com.techelevator.dao.JdbcMovieDao;
import com.techelevator.dao.JdbcShowtimeDao;
import com.techelevator.model.Movie;
import com.techelevator.model.Showtime;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path="/api")
public class ShowtimeController {
    private JdbcShowtimeDao jdbcShowtimeDao;

    private ShowtimeController(JdbcShowtimeDao jdbcShowtimeDao){
        this.jdbcShowtimeDao = jdbcShowtimeDao;
    }

    @RequestMapping(value="showtime/{movieId}", method = RequestMethod.GET)
    public List<Showtime> getShowtimeByMovieId(@PathVariable int movieId){
        return jdbcShowtimeDao.getShowtimeByMovieId(movieId);
    }

    @RequestMapping(value="reservation/{showtimeId}",method = RequestMethod.GET)
    public Showtime getShowtimeAndTitleByShowtimeId(@PathVariable int showtimeId){
        return jdbcShowtimeDao.getShowtimeAndTitleByShowtimeId(showtimeId);
    }
}
