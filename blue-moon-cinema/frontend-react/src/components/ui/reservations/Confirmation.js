import React, { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Spacer from "../../../Spacer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {reserveConfirmation} from "../../../api/TransactionApi";
import Card from 'react-bootstrap/Card';
import happy_popcorn from '../../../images/happy_popcorn.jpg';
import barcode from '../../../images/barcode.jpg';
import '../../../PrettyMe.css';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const Confirmation = (props) => {

  const [callingReservation, setCalling] = useState(false);
  const [reservation, setReservation] = useState();
  const [seatNumbers, setSeatNumbers] = useState('');
  const { width, height } = useWindowSize();

  useEffect(() => {
    const getReservationInfo = () => {
      const reservationDetail = async () => {
        if (!callingReservation) {
          setCalling(true);
          const localReservation = await reserveConfirmation(props.reservationId);
          setCalling(false);
          setReservation(localReservation);
          const newSeating = localReservation.seating_number.substring(1, localReservation.seating_number.length -1).split(',');
          setSeatNumbers(newSeating);
        }
      }
      reservationDetail();
    };
    getReservationInfo();
  }, [callingReservation, props.reservationId]);

    const handlePrint = () => {
      window.print();
    };


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

  return (
    <>
      {reservation &&
        <Row>
         <Confetti
          width={width}
          height={height}
          gravity={0.1}
          tweenDuration={5000}
        /> 
        <Col></Col>
        <Col key="titleCard">
        <Spacer height="3rem"/>
          <Card className="my-2"
              style={{
                maxWidth: '30rem'
              }}>
              <Card.Body>
                <Spacer height="3rem"/>
                <center><label className="rainbow">
                  <h0>All set!</h0>
                </label></center>
                <center><h5>You are going to see {reservation?.title}</h5></center>
                <center><h5>on {convertToDate(reservation?.showDate)} @{convertTo12HourFormat(reservation?.showTime)}</h5></center>
              </Card.Body>
              <div className="text-center">
              <Button onClick={handlePrint} >Print</Button>

              </div>
              <Card.Img variant="top" src={happy_popcorn} width="2%" />
              <Spacer height="3rem"/>
            </Card>
        </Col>
        <Col>
        <Spacer height="3rem"/>
              {seatNumbers.map((seatNumber, index) => (
               <Card key={index}>
               <Card.Body>
                <Spacer height="3rem"/>
                <h1>Digital Ticket</h1> 
                <h5>Seat Number: {seatNumber}</h5>
                <p>{reservation?.title}: {convertToDate(reservation?.showDate)} @{convertTo12HourFormat(reservation?.showTime)}</p>
                <Card.Img variant="top" src={barcode} width="2%" />
                </Card.Body>
                </Card>
              ))}
        </Col>

        <Col> 
        <Spacer height="3rem"/>
        <Card className="my-2"
            style={{
              minWidth: '20rem'
            }}>
            <Card.Body>
            <Spacer height="3rem"/>
            <center><label className="rainbow">
                  <h1>Billing Information</h1>
                </label></center> 
              <p>
              <h0>--------------------------------------------------</h0>  
              <p></p>
              <h6>Name: {reservation?.customer_name} </h6>
              </p>
              <p>
              <h6>Email:  {reservation?.email_address} </h6>
              </p>
              <p>
              <h6>Address:  {reservation?.billing_address} </h6>
              </p>
              <p>
              <h6>Zipcode:  {reservation?.zipcode} </h6>
              </p>
              <h0>___________________________________________________</h0>  
              <p >{reservation?.num_tickets} tickets &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;${reservation?.total_cost}</p>
              <Spacer height="3rem"/>
              <p>Notice: Tickets will be invalid on or after showtime has passed.</p>
              <Spacer height="3rem"/>
              <h6><center>Question?</center></h6>
              <p><center>Reservation Helpline: +1 345-391-3895</center></p>
              <p><center>Customer Service: +1 359-345-1597</center></p>
              <h6><center>Thank you for choosing Blue Moon Cinema</center></h6>
              <h7><center>Powered by © Red Sun Corp.</center></h7>
              <Spacer height="1rem"/>
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

export default Confirmation;
