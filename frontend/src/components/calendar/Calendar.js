import React, { Component } from 'react';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventSummary: '',
            eventStartTime: '',
            eventEndTime: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleAddEvent = () => {
      const { eventSummary, eventStartTime, eventEndTime } = this.state;
  
      // Validate input fields
      if (!eventSummary || !eventStartTime || !eventEndTime) {
          alert("Please fill in all fields.");
          return;
      }
  
      // Create event object
      const eventData = {
          summary: eventSummary,
          start: eventStartTime,
          end: eventEndTime
      };
  
      // Send POST request to backend
      fetch('/add-event', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(eventData)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to add event');
          }
          return response.json();
      })
      .then(data => {
          // Handle success response
          alert('Event added successfully!');
          // Clear input fields
          this.setState({
              eventSummary: '',
              eventStartTime: '',
              eventEndTime: ''
          });
      })
      .catch(error => {
          // Handle error
          console.error('Error adding event:', error);
          alert('Failed to add event. Please try again later.');
      });
  }

    render() {
        return (
            <div>
                <h2>Add Event to Google Calendar</h2>
                <div>
                    <label>Event Summary:</label>
                    <input
                        type="text"
                        name="eventSummary"
                        value={this.state.eventSummary}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        name="eventStartTime"
                        value={this.state.eventStartTime}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        name="eventEndTime"
                        value={this.state.eventEndTime}
                        onChange={this.handleInputChange}
                    />
                </div>
                <button onClick={this.handleAddEvent}>Add Event</button>
            </div>
        );
    }
}

export default Calendar;
