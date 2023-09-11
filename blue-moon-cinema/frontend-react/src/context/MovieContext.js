import { utilFetchWrapper } from "../services/utilFetchWrapper";
import { createContext, useState, useContext} from 'react';

export const MovieContext = createContext();
const fetchWrapper = utilFetchWrapper();

export const MovieProvider = ({ children }) => {
  const [currentMovies, setCurrentMovies] = useState({
    movieList:[],
    searches:[],
    lastSearch:""
  });

  const [selectedMovie, setSelectedMovie] = useState(null);

  // useEffect(() => {
  //   fetchWrapper.get('/movies')
  //   .then(response => response.json())
  //   .then(data => {
  //     setCurrentMovies(prevState => ({
  //       ...prevState,
  //       movieList: data,
  //     }));
  //   })
  //   .catch(error => {
  //     console.error('Error fetching movie data:', error);
  //   })
  // }, []);



  // const fetchMovieDetail = (movieId) => {
  //   fetchWrapper.get(`/movies/${movieId}`)
  //   .then(response => {
  //     setSelectedMovie(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching movie details:', error);
  //   });
  // };

  const fetchMovieDetail = async(movieId) => {
    try {
    const response = await fetchWrapper.get(`/movies/${movieId}`);
      if (!response.ok){
        throw new Error('API request failed');
      }
      const movieDetail = await response.json(); 
      setSelectedMovie(movieDetail);
    } catch (error) {
      console.error('Error fetching movie detail:', error);
    }
  };
 

  return (
    <MovieContext.Provider value={{ currentMovies, setCurrentMovies, selectedMovie, setSelectedMovie, fetchMovieDetail}}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext); 
};
