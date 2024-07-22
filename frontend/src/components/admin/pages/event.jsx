import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./event.css";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    img: null,
    title: "",
    description: "",
    time: "",
    day: "",
    monthyear: "",
    url: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const fileInputRef = useRef(null);

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:3001/event");
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setNewEvent({ ...newEvent, img: files[0] });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const addOrUpdateEvent = async () => {
    try {
      const formData = new FormData();
      for (const key in newEvent) {
        formData.append(key, newEvent[key]);
      }

      if (editMode) {
        await axios.put(
          `http://localhost:3001/editevent/${currentEventId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:3001/addevent", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setNewEvent({
        img: null,
        title: "",
        description: "",
        time: "",
        day: "",
        monthyear: "",
        url: "",
      });
      setEditMode(false);
      fetchEvents();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
    setNewEvent({
      img: null,
      title: event.title,
      description: event.description,
      time: event.time,
      day: event.day,
      monthyear: event.monthyear,
      url: event.url,
    });
    setCurrentEventId(event._id);
    setEditMode(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Events Manager</h1>
        <input
          type="file"
          name="img"
          placeholder="Image URL"
          onChange={handleChange}
          ref={fileInputRef}
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
            <img src={`data:image/jpeg;base64,${event.img}`} alt={event.title} />
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
