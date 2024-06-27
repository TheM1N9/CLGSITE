// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./event.css";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    img: "",
    title: "",
    description: "",
    time: "",
    day: "",
    monthyear: "",
    url: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:3001/event");
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const addOrUpdateEvent = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/editevent/${currentEventId}`,
          newEvent
        );
      } else {
        await axios.post("http://localhost:3001/addevent", newEvent);
      }
      setNewEvent({
        img: "",
        title: "",
        description: "",
        time: "",
        day: "",
        monthyear: "",
        url: "",
      });
      setEditMode(false);
      fetchEvents();
    } catch (error) {
      console.error("There was an error!", error.response.data);
      alert("There was an error: " + error.response.data.message);
    }
  };

  const removeEvent = async (id) => {
    await axios.delete(`http://localhost:3001/delevent/${id}`);
    fetchEvents();
  };

  const editEvent = (event) => {
    setNewEvent(event);
    setCurrentEventId(event._id);
    setEditMode(true);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Events Manager</h1>
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={newEvent.img}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newEvent.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newEvent.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="time"
          placeholder="Time"
          value={newEvent.time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="day"
          placeholder="Day"
          value={newEvent.day}
          onChange={handleChange}
        />
        <input
          type="text"
          name="monthyear"
          placeholder="Month and Year"
          value={newEvent.monthyear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={newEvent.url}
          onChange={handleChange}
        />
        <button onClick={addOrUpdateEvent}>
          {editMode ? "Update Event" : "Add Event"}
        </button>
      </div>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
            <img src={event.img} alt={event.title} />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.time}</p>
              <p>{event.day}</p>
              <p>{event.monthyear}</p>
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                Event Link
              </a>
              <div className="event-buttons">
                <button onClick={() => editEvent(event)}>Edit</button>
                <button onClick={() => removeEvent(event._id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Event;
