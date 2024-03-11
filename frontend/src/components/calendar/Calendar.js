import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library for making HTTP requests

function Calendar() {
  const [summary, setSummary] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [email, setEmail] = useState('');

  const handleAddAttendee = () => {
    setAttendees([...attendees, { email }]);
    setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the event object with the form values
    const event = {
      summary,
      location,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Europe/Dublin',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Europe/Dublin',
      },
      recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
      attendees,
      reminders: {
        useDefault: false,
        overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
      },
    };
    // Now you can send this event object to your backend API to create the event
    try {
        // Make HTTP POST request to Flask backend
        const response = await axios.post('http://localhost:8000/calendar', event);
        console.log('Event created:', response.data);
      } catch (error) {
        console.error('Error creating event:', error.response.data);
      }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Summary:</label>
          <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Start Date Time:</label>
          <input type="datetime-local" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} />
        </div>
        <div>
          <label>End Date Time:</label>
          <input type="datetime-local" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} />
        </div>
        <div>
          <label>Add Attendee:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="button" onClick={handleAddAttendee}>Add</button>
          <ul>
            {attendees.map((attendee, index) => (
              <li key={index}>{attendee.email}</li>
            ))}
          </ul>
        </div>
        <button type="submit" onClick={handleSubmit}>Create Event</button>
      </form>
    </div>
  );
}

export default Calendar;
