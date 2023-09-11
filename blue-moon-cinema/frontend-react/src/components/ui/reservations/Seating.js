import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import '../../../Cinema.css'
import {getOccupiedSeating, getReservationAllInfo, updateSeatingChart} from "../../../api/TransactionApi";
import Spacer from "../../../Spacer";
import Button from 'react-bootstrap/Button';

const seats = Array.from({ length: 8 * 3 }, (_, i) => i);
export default function Seating() {
  const {reservationId} = useParams(); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservation, setReservation] = useState(); 
  const [callingReservation, setCalling] = useState(false);
  const [num_tickets, setNum_tickets] = useState();

  const handleSubmission = async(event) => {
    if (event !== undefined) event.preventDefault();
    await updateSeatingChart(selectedSeats, reservationId);
    console.log(selectedSeats)
    window.location.href=`/confirmation/${reservationId}`;
  }

  useEffect(() => {
    const getReservationData = async () => {
      if (!callingReservation) {
        setCalling(true);
        const localReservation = await getReservationAllInfo(reservationId);
        setCalling(false);
        setReservation(localReservation);
        setNum_tickets(localReservation.num_tickets);
      }
    };
    getReservationData();
  }, [callingReservation, reservationId]);

  return (
    <div className="App">
      <Spacer height="10rem"/>
      <ShowCase />
      <Cinema
        reservationId={reservationId} 
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
      />
      <Spacer height="5rem"/>
      <Button type="submit" disabled= {selectedSeats.length !== num_tickets}  
      style={{backgroundColor: selectedSeats.length !== num_tickets ? 'lightblue' : 'blue'}} onClick={handleSubmission} >Check Out</Button>
      <Spacer height="30rem"/>
    </div>
  );
}
function listStringToNum(stringlist) {
  // Merge the list of strings into a single string
  const mergedString = stringlist.join(',');
  //  Split the merged string into an array of substrings
  const stringArray = mergedString.substring(1, mergedString.length - 1).split(',');
  const integerArray = stringArray.map((str) => parseInt(str, 10));
  return integerArray;
}

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>Available</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
    </ul>
  );
}
function Cinema({ reservationId, selectedSeats, onSelectedSeatsChange }) {
  const [occupied, setOccupied] = useState([]);
  const [reservation, setReservation] = useState({});
  const [showtimeId, setShowtimeId] = useState(null);
  const [callingReservation, setCalling] = useState(false);

  useEffect(() => {
    const getReservationData = async () => {
      if (!callingReservation) {
        setCalling(true);
        const localReservation = await getReservationAllInfo(reservationId);
        setCalling(false);
        setReservation(localReservation);
        setShowtimeId(localReservation.showtimeId);
      }
    };
    getReservationData();
  }, [callingReservation, reservationId]);

  useEffect(() => {
    const occupiedReservations = []
    const occupiedSeats = []
    const getOccupiedReservations = async () => {
      const reservations = await getOccupiedSeating(reservation.showtimeId);
      occupiedReservations.push(...reservations);
      for (let i = 0; i < occupiedReservations.length; i++){
        occupiedSeats.push(occupiedReservations[i].seating_number);
      }
      console.log(occupiedSeats)
      const listOccupied_num = listStringToNum(occupiedSeats);
      setOccupied(listOccupied_num);
    };
    getOccupiedReservations();
  }, [reservation.showtimeId, selectedSeats]);
  
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(   
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <div className="Cinema">
      <div className="screen">Screen</div>
      <div className="seats">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = occupied.includes(seat);
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                isSelected && 'selected',
                isOccupied && 'occupied'
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : (e) => {
                      if (e.key === 'Enter') {
                        handleSelectedState(seat);
                      }
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}