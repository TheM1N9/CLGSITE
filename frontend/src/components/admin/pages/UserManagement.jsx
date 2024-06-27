import React, { useState, useEffect } from "react";
import "./userManagement.css"; // Import the CSS file
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState({
    events: false,
    results: false,
    timetable: false,
    teachingFaculty: false,
    techFaculty: false,
    syllabus: false,
    calendar: false,
    images: false,
    publications: false,
    achievements: false,
    participations: false,
    placements: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password, permissions };

    if (editMode) {
      axios
        .put(`http://localhost:3001/users/${currentUserId}`, userData)
        .then((response) => {
          console.log("User updated successfully:", response.data);
          fetchUsers();
          resetForm();
        })
        .catch((error) => {
          console.error("There was an error updating the user:", error);
        });
    } else {
      axios
        .post("http://localhost:3001/adduser", userData)
        .then((response) => {
          console.log("User added successfully:", response.data);
          fetchUsers();
          resetForm();
        })
        .catch((error) => {
          console.error("There was an error adding the user:", error);
        });
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUserId(user._id);
    setUsername(user.username);
    setPassword(user.password);
    setPermissions(user.permissions);
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:3001/users/${userId}`)
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        fetchUsers();
      })
      .catch((error) => {
        console.error("There was an error deleting the user:", error);
      });
  };

  const resetForm = () => {
    setEditMode(false);
    setCurrentUserId(null);
    setUsername("");
    setPassword("");
    setPermissions({
      events: false,
      results: false,
      timetable: false,
      teachingFaculty: false,
      techFaculty: false,
      syllabus: false,
      calendar: false,
      images: false,
      publications: false,
      achievements: false,
      participations: false,
      placements: false,
    });
  };

  return (
    <div className="user-management">
      <h2>{editMode ? "Edit User" : "Add New User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="permissions">
          <h3>Permissions</h3>
          {Object.keys(permissions).map((key) => (
            <div key={key} className="form-group">
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={permissions[key]}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">{editMode ? "Update User" : "Add User"}</button>
      </form>

      <div className="user-list">
        <h2>Existing Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.username}
              <div>
                <button className="edit-button" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
