import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { MovieContext } from '../../context/MovieContext';
import { getMovieList } from '../../api/MovieApi';

const MovieSearch = () => {
    const [searchValue, setSearchValue] = useState("");
    const { setCurrentMovies } = useContext(MovieContext);
    const movieContext = useContext(MovieContext);
    const currentMovies = movieContext.currentMovies;


    const doSetSearchValue = (event) => {
        setSearchValue(event.target.value);
    };
    const handleSearch = (event) => {
        if (event !== undefined) event.preventDefault();
        console.log("Movies");
        const search = async () => {
            /* TODO: Note call to the getMovieList in MovieApi 
                     call the application method which calls the service 
                     which calls the api server 
                     
                     because the application method does an async call to the
                     service method (getMovieList()), we use await to await completion
                     
                     this --> application method --> service --> call api --> server
                     
                     */
            // Call the api method with search value and store result in localMovies       
            const localMovies = await getMovieList(searchValue);
            console.log(`Found:${localMovies.length} records`);
            const message = `Search: ${searchValue} - ${localMovies.length} records`;
            let searches = currentMovies.searches;                
            if (currentMovies.lastSearch !== message) {
                searches.push(message);
            }
            const moviesInfo = {
                /* TODO: Assign the data returned to the currentMovies property
                            in our MovieContext */
                currentMovies: localMovies,
                searches: searches,
                lastSearch: message
            };
            setCurrentMovies(moviesInfo);
        }
        search();
        console.log("Found");
    };
    const resetSearch = (event) => {
        if (event !== undefined) event.preventDefault();
        console.log("Resetting");
        const moviesInfo = {
            currentMovies: [],
            searches: currentMovies.searches,
            lastSearch: ""
        };
        setCurrentMovies(moviesInfo);
        setSearchValue("");
        console.log("Reset");
    }
    return (
        <div className="container">
            <Form>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchValue}
                    onChange={doSetSearchValue}
                />
                <Button type="submit" variant="outline-success" onClick={handleSearch}>Search Movies</Button>
                <Button variant="outline-success" onClick={resetSearch}>Reset</Button>
            </Form>
        </div>
    );
};

export default MovieSearch;
