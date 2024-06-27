import React, { useState, useEffect } from "react";
import axios from "axios";
import "./teachingfaculty.css";

const Techfaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [newFaculty, setNewFaculty] = useState({
    cover: "",
    name: "",
    work: "",
    url: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentFacultyId, setCurrentFacultyId] = useState(null);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tech");
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty", error);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    setNewFaculty({ ...newFaculty, [e.target.name]: e.target.value });
  };

  const addOrUpdateFaculty = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/edittech/${currentFacultyId}`,
          newFaculty
        );
      } else {
        await axios.post("http://localhost:3001/addtech", newFaculty);
      }
      setNewFaculty({
        cover: "",
        name: "",
        work: "",
        url: "",
      });
      setEditMode(false);
      fetchFaculty();
    } catch (error) {
      console.error("There was an error!", error.response?.data);
      alert("There was an error: " + error.response?.data?.message);
    }
  };

  const removeFaculty = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deletetech/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error removing faculty", error);
    }
  };

  const editFaculty = (faculty) => {
    setNewFaculty(faculty);
    setCurrentFacultyId(faculty._id);
    setEditMode(true);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Teaching Faculty Manager</h1>
        <input
          type="text"
          name="cover"
          placeholder="Cover Image URL"
          value={newFaculty.cover}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newFaculty.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="work"
          placeholder="Work"
          value={newFaculty.work}
          onChange={handleChange}
        />
        <input
          type="text"
          name="url"
          placeholder="Profile URL"
          value={newFaculty.url}
          onChange={handleChange}
        />
        <button onClick={addOrUpdateFaculty}>
          {editMode ? "Update Faculty" : "Add Faculty"}
        </button>
      </div>
      <ul className="faculty-list">
        {faculty.map((member) => (
          <li key={member._id} className="faculty-item">
            <img src={member.cover} alt={member.name} />
            <div className="faculty-details">
              <h3>{member.name}</h3>
              <p>{member.work}</p>
              <a href={member.url} target="_blank" rel="noopener noreferrer">
                Profile Link
              </a>
              <div className="faculty-buttons">
                <button onClick={() => editFaculty(member)}>Edit</button>
                <button onClick={() => removeFaculty(member._id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Techfaculty;
