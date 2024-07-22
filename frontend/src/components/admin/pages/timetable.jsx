// src/Timetable.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [newTimetable, setNewTimetable] = useState({
    name: "",
    url: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentTimetableId, setCurrentTimetableId] = useState(null);
  const fileInputRef = useRef(null);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get("http://localhost:3001/timetables");
      setTimetables(response.data);
      console.log("Fetched timetables:", response.data);
    } catch (error) {
      console.error("Error fetching timetables", error);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "url") {
      setNewTimetable({ ...newTimetable, url: files[0] });
    } else {
      setNewTimetable({ ...newTimetable, [name]: e.target.value });
    }
  };

  const addOrUpdateTimetable = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newTimetable.name);
      if (newTimetable.url) {
        formData.append("url", newTimetable.url);
      }

      if (editMode) {
        await axios.put(
          `http://localhost:3001/edittimetable/${currentTimetableId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:3001/addtimetable", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setNewTimetable({
        name: "",
        url: null,
      });
      setEditMode(false);
      fetchTimetables();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("There was an error!", error.response?.data);
      alert("There was an error: " + error.response?.data?.message);
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
    setNewTimetable({
      name: timetable.name,
      url: null,
    });
    setCurrentTimetableId(timetable._id);
    setEditMode(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
          type="file"
          name="url"
          placeholder="PDF File"
          onChange={handleChange}
          ref={fileInputRef}
        />
        <button onClick={addOrUpdateTimetable}>
          {editMode ? "Update Timetable" : "Add Timetable"}
        </button>
      </div>
      <ul className="timetable-list">
        {timetables.map((timetable) => (
          <li key={timetable._id} className="timetable-item">
            <div className="timetable-details">
              <h3>{timetable.name}</h3>
              <a
                href={`data:application/pdf;base64,${timetable.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </a>
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
