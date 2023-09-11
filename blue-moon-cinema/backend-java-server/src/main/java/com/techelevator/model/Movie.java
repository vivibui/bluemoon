package com.techelevator.model;

public class Movie {

    private int movieId;
    private String title;
    private String genre;

    private String description;
    private String rating;
    private int runtime;
    private String poster_img;


    public Movie(int movieId, String title, String genre, String description, String rating, int runtime) {
        this.movieId = movieId;
        this.title = title;
        this.genre = genre;
        this.description = description;
        this.rating = rating;
        this.runtime = runtime;
    }

    public Movie() {

    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }


    public int getRuntime() {
        return runtime;
    }

    public void setRuntime(int runtime) {
        this.runtime = runtime;
    }

    public String getPoster_img() {
        return poster_img;
    }

    public void setPoster_img(String poster_img) {
        this.poster_img = poster_img;
    }
    @Override
    public String toString() {
        return "Movie{" +
                "movie_id=" + movieId +
                ", title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", description= ' " + description + '\'' +
                ", rating='" + rating + '\'' +
                ", runtime=" + runtime +
                ", poster_img='" + poster_img + '\'' +
                '}';
    }


}
