import React, { useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { createTransaction } from "../../../api/TransactionApi";
import { getShowtimeByShowtimeId } from "../../../api/ShowtimeApi";
import Form from 'react-bootstrap/Form';
// import Layout from "../../ui/Layout";
import Button from 'react-bootstrap/Button';
import Spacer from "../../../Spacer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

 import Seating from './Seating';

 import { UserContext } from "../../../context/UserContext";

const Reservations = (props) => {
  // const [transaction, setTransaction] = useState();
  const [callingReservation, setCalling] = useState(false);
  const [showtime, setShowtime] = useState();
  const [num_adulttickets, setAdultTickets] = useState(0);
  const [adult_price, setAdultPrice] = useState(10.0);
  const [num_childtickets, setChildTickets] = useState(0);
  const [child_price, setChildPrice] = useState(5.0);
  const [num_seniortickets, setSeniorTickets] = useState(0);
  const [senior_price, setSeniorPrice] = useState(5.0);
  const [total_cost, setTotalCost] = useState(0.0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [movieId, setMovieId] = useState(0);
  const [userId, setUserId] = useState(0)

  // const navigate = useNavigate();  
  const [reservationId, setReservationId] = useState(0);

  // getting user info
  const userContext = useContext(UserContext);
  const currentUser = userContext.currentUser;
  const [flag, setFlag] = useState(false);
  

  // Get showtime from props.showtimeId
  // Then set the local showtime 
  useEffect(() => {
    const getShowtime = () => {
      const showtimes = async () => {
        if (!callingReservation) {
          setCalling(true);
          const localShowtime = await getShowtimeByShowtimeId(props.showtimeId);
          setCalling(false);
          setShowtime(localShowtime);
          if (isBefore12PM(localShowtime.showTime)){
            setFlag(true);
          }
        }
      }
      
      showtimes();
    };
    getShowtime();
  }, [callingReservation, props.showtimeId, flag]);
  

  console.log(adult_price)

  function isBefore12PM(time) {
    // const currentTime = new Date(time);
    // const currentHour = currentTime.getHours();
  
    return time < "12:00:00";
  }

// ------ PRICE FOR TICKETS----- ENDS HERE

  const handleContinue = async(event) => {
    if (event !== undefined) event.preventDefault();
    console.log(transaction)
    const response = await createTransaction(transaction);
    console.log(response)
    const newReservationId = response.reservationId; 
    // navigate(`seating/${newReservationId}`);
    window.location.href=`/seating/${newReservationId}`;
  }



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


  function convertToDate(Date) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // Splitting the date string into hours and minutes
    const [year, month, day] = Date.split('-');
    const formattedDate = `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
    return formattedDate;
  }

  const defaultReservation = {
    movieId: 0,
    userId: 0,

    showtimeId: 0,
    num_tickets: 0,
    customer_name: 'default',
    billing_address: 'default', 
    zipcode: 11111, 
    email_address: 'default',
    total_cost: 0, 
    seating_number: ''
  };
  const [transaction, setTransaction] = useState(defaultReservation);

  const onInputchange = (event) => {
    event.preventDefault();
    let localTransaction = transaction;
    let newNumAdultTickets = num_adulttickets;
    let newNumChildTickets = num_childtickets; 
    let newNumSeniorTickets = num_seniortickets;
    if ((event.target.name==="num_adulttickets")){
      newNumAdultTickets = parseInt(event.target.value);
      setAdultTickets(newNumAdultTickets);
    } else if ((event.target.name==="num_childtickets")){
      newNumChildTickets =  parseInt(event.target.value);
      setChildTickets(newNumChildTickets);
    } else if ((event.target.name==="num_seniortickets")){
      newNumSeniorTickets = parseInt(event.target.value);
      setSeniorTickets(newNumSeniorTickets);
    } else if ((event.target.name==="name")){
      localTransaction.customer_name = (event.target.value);
      setName(event.target.value);
    } else if ((event.target.name==="email")){
      localTransaction.email_address = event.target.value;
      setEmail(event.target.value);
    } else if ((event.target.name==="address")){
      localTransaction.billing_address = (event.target.value);
      setAddress(event.target.value);
    } else if ((event.target.name==="zip")){
      localTransaction.zipcode = parseInt(event.target.value);
      setZip(event.target.value);
    } 
    
    localTransaction.num_tickets = newNumAdultTickets + newNumChildTickets + newNumSeniorTickets; 
    setTotalCost(newNumChildTickets * (flag ? child_price - 2 : child_price) + newNumSeniorTickets * (flag ? senior_price - 2 : senior_price) + newNumAdultTickets * (flag ? adult_price - 2 : adult_price));
    localTransaction.total_cost = total_cost; 
    
    localTransaction.showtimeId = showtime.showtimeId;
    setMovieId(showtime.movieId);
    
    localTransaction.movieId = movieId;
    setUserId(currentUser.id);
    
    localTransaction.userId = userId;
    setTransaction(localTransaction);
  
};

  function isDisable(){
    if (name.validity.valid && email.validity.valid && address.validity.valid && zip.validity.valid){
      return false;
    } else {
      return true; 
    }
  }

  return (
    <>
      {showtime &&
        <Row>
          <Spacer height="10rem" />
          <div className="text-center">
            <h4 style={{ color: 'yellow' }}>Booking for {showtime.movieTitle} on {convertToDate(showtime.showDate)} @{convertTo12HourFormat(showtime.showTime)}</h4>
            <br/>
            <h6 style={{ color: 'white' }}>{flag ? "You have a $2 discount for your selected showtime":""}</h6>
          </div>
          <Col></Col>
          <Col>
            <Form className="new-reservation-form" onSubmit={handleContinue}>
              <Spacer height="5rem" />
              {/* Adult Tickets Section */}
              <Form.Group className="mb-3" >
                <Form.Label htmlFor='num_adulttickets' style={{ color: 'white' }}>Number of Adult Tickets: </Form.Label>
                <Form.Control className='w-100' id='num_adulttickets' type="number" placeholder="Number of Adult Tickets"
                  value={num_adulttickets} min={0} name='num_adulttickets' onChange={onInputchange} />
              </Form.Group>
              {/* Child Tickets Section */}
              <Form.Group className="mb-3" >
                <Form.Label htmlFor='num_childtickets' style={{ color: 'white' }}>Number of Child Tickets: </Form.Label>
                <Form.Control className='w-100' id='num_childtickets' type="number" placeholder="Number of Child Tickets"
                  value={num_childtickets} min={0} name='num_childtickets' onChange={onInputchange} />
              </Form.Group>
              {/* Senior Tickets Section */}
              <Form.Group className="mb-3" >
                <Form.Label htmlFor='num_seniortickets' style={{ color: 'white' }}>Number of Senior Tickets: </Form.Label>
                <Form.Control className='w-100' id='num_seniortickets' type="number" placeholder="Number of Senior Tickets"
                  value={num_seniortickets} min={0}name='num_seniortickets' onChange={onInputchange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'white' }}><h3>Total Cost:</h3></Form.Label>
                {/* <Form.Control readOnly  value={`$${total_cost.toFixed(2)}`} /> */}
                <div  style={{ color: 'white', textAlign: 'right' }}><h3>{`$${total_cost.toFixed(2)}`}</h3></div>
              </Form.Group>
            </Form>

          </Col>
          <Col></Col>
          <Col>
            {/* Billing Information Section */}
            <Form className="new-reservation-form" onSubmit={handleContinue}>
              <Spacer height="5rem" />
              <Form.Group className="mb-3" >
                <Form.Label htmlFor='name' style={{ color: 'white' }}>Name:</Form.Label>
                <Form.Control className='w-100' id='name' type="text" placeholder="Name"
                  value={name} minLength={1} name='name' onChange = {onInputchange}  required />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label htmlFor='email' style={{ color: 'white' }}>Email:</Form.Label>
                <Form.Control className='w-100' id='email' type="email" placeholder="Email"
                  value={email} minLength={1} name='email' onChange = {onInputchange} required />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label htmlFor='address' style={{ color: 'white' }}>US Address:</Form.Label>
                <Form.Control className='w-100' id='address' type="text" placeholder="Address"
                  value={address} minLength={1} name='address' onChange = {onInputchange} required />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label htmlFor='zip' style={{ color: 'white' }}>Zipcode:</Form.Label>
                <Form.Control className='w-100' id='zip' type="numeric" placeholder="Zipcode"
                  value={zip} minLength={4} maxLength={5} name='zip' onChange = {onInputchange} required />
              </Form.Group>
              <div className="text-center">
                  <Button type="submit" disabled= {isDisable}  
                  style={{backgroundColor: 'blue' }}>Continue</Button>                      
              </div>
              <Spacer height="15rem" />
            </Form>
          </Col>
          <Col></Col>
        </Row>
      }
    </>
  );
}

export default Reservations;
