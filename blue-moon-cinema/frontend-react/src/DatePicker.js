import DatePicker from 'react-datepicker';
import React, { useState} from 'react';

  //Calendar Validity 
  function DateSelection({ showtimes }) {
    const [selectedDate, setSelectedDate] = useState(Date());
    const availableDates = showtimes.map(showtime => new Date(showtime.show_date));
    const isDateDisabled = date => {
      return date < new Date(); // Disable past dates
    };

    return (
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            filterDate={isDateDisabled}
            minDate={new Date()}
            excludeDates={availableDates}
          />
        </div>
      );
}
export default DateSelection;