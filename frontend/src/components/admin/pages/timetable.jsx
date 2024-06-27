// src/Timetable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./timetable.css";

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [newTimetable, setNewTimetable] = useState({
    name: "",
    url: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentTimetableId, setCurrentTimetableId] = useState(null);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get("http://localhost:3001/timetables");
      setTimetables(response.data);
    } catch (error) {
      console.error("Error fetching timetables", error);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  const handleChange = (e) => {
    setNewTimetable({ ...newTimetable, [e.target.name]: e.target.value });
  };

  const addOrUpdateTimetable = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/edittimetable/${currentTimetableId}`,
          newTimetable
        );
      } else {
        await axios.post("http://localhost:3001/addtimetable", newTimetable);
      }
      setNewTimetable({
        name: "",
        url: "",
      });
      setEditMode(false);
      fetchTimetables();
    } catch (error) {
      console.error("There was an error!", error.response.data);
      alert("There was an error: " + error.response.data.message);
    }
  };

  const removeTimetable = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deletetimetable/${id}`);
      fetchTimetables();
    } catch (error) {
      console.error("Error removing timetable", error);
    }
  };

  const editTimetable = (timetable) => {
    setNewTimetable(timetable);
    setCurrentTimetableId(timetable._id);
    setEditMode(true);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Timetable Manager</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newTimetable.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={newTimetable.url}
          onChange={handleChange}
        />
        <button onClick={addOrUpdateTimetable}>
          {editMode ? "Update Timetable" : "Add Timetable"}
        </button>
      </div>
      <ul className="timetable-list">
        {timetables.map((timetable) => (
          <li key={timetable._id} className="timetable-item">
            <div className="adminedit-details">
              <h3>{timetable.name}</h3>
              {/* <a href={timetable.url} target="_blank" rel="noopener noreferrer">
                {timetable.url}
              </a> */}
              <div className="timetable-buttons">
                <button onClick={() => editTimetable(timetable)}>Edit</button>
                <button onClick={() => removeTimetable(timetable._id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timetable;
