import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getMovieDetail } from "../../../api/MovieApi";
import { getShowtimes } from "../../../api/ShowtimeApi";
import Spacer from "../../../Spacer";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UserContext } from "../../../context/UserContext";
import Login from "../../../pages/Login/Login";


const MovieDetail = (props) => {
  const [movieDetail, setMovieDetail] = useState();
  const [callingDetail, setCalling] = useState(false);
  const [showtimes, setShowtimes] = useState([]);
  const userContext = useContext(UserContext);
  const currentUser = userContext.currentUser;

  const [mainModal, setMainModal] = useState(false);
	const toggleMainModal = event => {
		event.preventDefault();
		setMainModal(!mainModal);
	}

  useEffect(() => {
    const getDetail = () => {
      const movieDetail = async () => {
        if (!callingDetail) {
          setCalling(true);
          const localMovie = await getMovieDetail(props.movieId);
          setCalling(false);
          setMovieDetail(localMovie);
        }
      }
      movieDetail();
    };
    getDetail();
  }, [callingDetail, props.movieId]);

  useEffect(() => {
    const getShowtime = () => {
      const showtimes = async () => {
        if (!callingDetail) {
          setCalling(true); 
          const localShowtimes = await getShowtimes(props.movieId);
          setCalling(false);
          setShowtimes(localShowtimes);
        }
      }
      showtimes();
    };
    getShowtime();
  }, [callingDetail, props.movieId]);



  function convertTo12HourFormat(militaryTime) {
    // Splitting the time string into hours and minutes
    const [hours, minutes] = militaryTime.split(':').map(Number);
    // Determining AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';
    // Converting to 12-hour format
    const formattedHours = hours % 12 || 12;
    // Creating the formatted time string
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
  }

  
  // Get the current date and time
  const currentDate = new Date();
  // Calculate the date that's seven days from now
  const sevenDaysFromNow = new Date(currentDate);
  sevenDaysFromNow.setDate(currentDate.getDate() + 7);
  sevenDaysFromNow.setHours(23,59,59)

  function ShowtimeComponent({ showtimes }) {
    // Step 1: Group showtimes by date
    const groupedShowtimes = {};
    showtimes.forEach(showtime => {
      if (showtime.showDate && showtime.showTime) {
        const showDateTime = new Date(`${showtime.showDate}T${showtime.showTime}`);
        const formattedDateKey = showDateTime.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        // Compare date of showDateTime and currentDate
        if (
          (showDateTime > currentDate && showDateTime <= sevenDaysFromNow) || // Future date
          (showDateTime.getDate() === currentDate.getDate() && showDateTime.getHours() <= currentDate.getHours())
        ) {
          if (!groupedShowtimes[formattedDateKey]) {
            groupedShowtimes[formattedDateKey] = [];
          }
          groupedShowtimes[formattedDateKey].push({ ...showtime, showDateTime });
        }
      }
    });

    // Step 2/3: Render Showtimes for selectedDate
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = date => {
      setSelectedDate(date);
    };

    // Filter showtimes based on the selected date
    const filteredShowtimes = showtimes.filter(showtime => {
      if (!selectedDate) return false; // No date selected, so no showtimes to show
      const showDateTime = new Date(`${showtime.showDate}T${showtime.showTime}`);
      return showDateTime.toDateString() === selectedDate.toDateString();
    });

    // Limit the 'selectable' days in the calendar
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 6); // Limit to 6 days in the future

    return (
      <div>
        <h2>Select a Date:</h2>
        <Spacer height="1rem"/>
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={currentDate}
        maxDate={maxDate}
        placeholderText="Select a date"
      />
        <Spacer height="2rem"/>
        <h2>Showtimes for {selectedDate ? selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Selected Date'}</h2>
        <div>
          {filteredShowtimes.map(showtime => {
            const showDateTime = new Date(`${showtime.showDate}T${showtime.showTime}`);
            const isFuture = showDateTime >= currentDate;
            return (
              <span key={showtime.movieId}>
                <button
                  style={{
                    margin: '5px 5px 10px 5px',
                    backgroundColor: isFuture ? "blue" : 'lightblue',
                    color: 'white',
                  }}
                  disabled={!isFuture}
                    className="btn btn-primary"
                    onClick={(e) => {
                    if (currentUser && currentUser.isAuthenticated){
                    e.preventDefault();
                    window.location.href=`/reservation/${showtime.showtimeId}`;
                    } else {
                      e.preventDefault();
                      window.location.href=`/login`;
                    }}}
                >
                  {convertTo12HourFormat(showtime.showTime)}
                </button>
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      {movieDetail &&
        <Row>
          <Spacer height="2rem"/>
          <Col>
          </Col>
          <Col key="imageCard">
            <Card className="my-2"
              style={{
                minWidth: '30rem'
              }}>
              <Card.Img variant="top" src={movieDetail.poster_img} alt={movieDetail.title} width="10%" />
            </Card>
          </Col>
          <Col key="titleCard">
            <Card className="my-2"
              style={{
                minWidth: '50rem'
              }}>
              <Card.Body>

                <h1>{movieDetail.title}</h1>
                  <Card.Subtitle className="mb-1 text-muted moveSubtitle"/>
                <p>
                  {movieDetail?.description}
                </p>
                <p>
                Genre: {movieDetail?.genre}
                </p>
                <p>
                Rating: {movieDetail?.rating}
                </p>
                <p>
                Runtime: {movieDetail.runtime} minutes
                </p>
                <Card.Text>
                  {/* // Render the ShowtimeComponent with the showtimes array as a prop */}
                  <div>
                    <ShowtimeComponent showtimes={showtimes} />
                  </div>
              </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col key="actorsCard">
          <Spacer height="55rem"/>
          </Col>
        </Row>
        
      }
      </>
  );
}
export default MovieDetail;
