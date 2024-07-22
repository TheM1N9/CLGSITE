import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import "./techfaculty.css";

const Techfaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [newFaculty, setNewFaculty] = useState({
    cover: null,
    name: "",
    work: "",
    url: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentFacultyId, setCurrentFacultyId] = useState(null);
  const fileInputRef = useRef(null);

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
    const { name, value, files } = e.target;
    if (name === "cover") {
      setNewFaculty({ ...newFaculty, cover: files[0] });
    } else {
      setNewFaculty({ ...newFaculty, [name]: value });
    }
  };

  const addOrUpdateFaculty = async () => {
    try {
      const formData = new FormData();
      for (const key in newFaculty) {
        formData.append(key, newFaculty[key]);
      }

      if (editMode) {
        await axios.put(
          `http://localhost:3001/edittech/${currentFacultyId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:3001/addtech", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setNewFaculty({
        cover: null,
        name: "",
        work: "",
        url: "",
      });
      setEditMode(false);
      fetchFaculty();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
    setNewFaculty({
      cover: null,
      name: faculty.name,
      work: faculty.work,
      url: faculty.url,
    });
    setCurrentFacultyId(faculty._id);
    setEditMode(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Teaching Faculty Manager</h1>
        <input
          type="file"
          name="cover"
          placeholder="Cover Image"
          onChange={handleChange}
          ref={fileInputRef}
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
            <img src={`data:image/jpeg;base64,${member.cover}`} alt={member.name} />
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
