import { useContext } from "react";
import { Nav } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from "react-router-bootstrap";
import {MovieContext } from "../../../context/MovieContext"
import Button from 'react-bootstrap/Button';


const MovieGrid = () => {
  const movieContext = useContext(MovieContext);
  const currentMovieInfo = movieContext.currentMovies;  
  const currentMovies = currentMovieInfo.currentMovies;
  const lastSearch = currentMovieInfo.lastSearch;

  return (
    <>
    
      {(currentMovies && (currentMovies.length === 0)) &&
        <div>No movies found</div>
      }
      {(lastSearch) &&
        <div>
            <span>{lastSearch}</span>
        </div>
      }     
      
      {currentMovies && (currentMovies.length > 0) &&
        <Row>
        
        {currentMovies.map(movie => (
          <Col key={movie.movieId}>
            <Card className="my-2"
              style={{
                width: '18rem',
                height: '48rem',
                margin: '25px', 
              }}>
              <Card.Img variant="top" src={movie.poster_img} alt={movie.title} width="10%" />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted moveSubtitle"
                  tag="h6">{movie.description}</Card.Subtitle>
                  <Card.Text>
                    {movie.overview}
                    <LinkContainer to={{ pathname: `/movies/${movie.movieId}` }} >
                      <Nav.Link><Button variant="primary">Show Detail</Button></Nav.Link>
                      {/* <Nav.Link>Show Detail</Nav.Link> */}
                    </LinkContainer>
                  </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>   
      }
    </>
  );
}
export default MovieGrid;