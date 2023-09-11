package com.techelevator.controller;

import com.techelevator.dao.JdbcMovieDao;
import com.techelevator.dao.MovieDao;
import com.techelevator.model.Movie;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path="/api")
public class MovieController {
    private JdbcMovieDao jdbcmovieDao;

    private MovieController(JdbcMovieDao jdbcmovieDao){
        this.jdbcmovieDao = jdbcmovieDao;
    }

    @RequestMapping(value="/movies",method = RequestMethod.GET)
    public List<Movie> getAllMovies(){
        return jdbcmovieDao.findAll();
    }

    @RequestMapping(value="/movies/{movieId}",method = RequestMethod.GET)
    public Movie getMovieById(@PathVariable String movieId){
        return jdbcmovieDao.getMovieById(Integer.parseInt(movieId));
    }

}

