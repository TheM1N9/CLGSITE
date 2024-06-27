import React, { useState, useEffect } from "react";
import axios from "axios";
import "./calendarManager.css";

const CalendarManager = () => {
  const [calendar, setCalendar] = useState([]);
  const [newCalendar, setNewCalendar] = useState({
    sno: "",
    academicYear: "",
    course: "",
    attachment: "",
    startDate: "",
    url: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [currentCalendarId, setCurrentCalendarId] = useState(null);

  const fetchCalendar = async () => {
    try {
      const response = await axios.get("http://localhost:3001/callender");
      setCalendar(response.data);
    } catch (error) {
      console.error("Error fetching calendar", error);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCalendar({ ...newCalendar, [name]: value });
  };

  const addOrUpdateCalendar = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/editcalendar/${currentCalendarId}`,
          newCalendar
        );
      } else {
        await axios.post("http://localhost:3001/addcalendar", newCalendar);
      }
      setNewCalendar({
        sno: "",
        academicYear: "",
        course: "",
        attachment: "",
        startDate: "",
        url: ""
      });
      setEditMode(false);
      fetchCalendar();
    } catch (error) {
      console.error("There was an error!", error.response?.data);
      alert("There was an error: " + error.response?.data?.message);
    }
  };

  const removeCalendar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deletecalendar/${id}`);
      fetchCalendar();
    } catch (error) {
      console.error("Error removing calendar", error);
    }
  };

  const editCalendar = (calendarItem) => {
    setNewCalendar({
      sno: calendarItem.sno,
      academicYear: calendarItem.academicYear,
      course: calendarItem.course,
      attachment: calendarItem.attachment,
      startDate: calendarItem.startDate,
      url: calendarItem.url
    });
    setCurrentCalendarId(calendarItem._id);
    setEditMode(true);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Academic Calendar Manager</h1>
        <input
          type="text"
          name="sno"
          placeholder="Serial Number"
          value={newCalendar.sno}
          onChange={handleChange}
        />
        <input
          type="text"
          name="academicYear"
          placeholder="Academic Year"
          value={newCalendar.academicYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={newCalendar.course}
          onChange={handleChange}
        />
        <input
          type="text"
          name="attachment"
          placeholder="Attachment"
          value={newCalendar.attachment}
          onChange={handleChange}
        />
        <input
          type="text"
          name="startDate"
          placeholder="Start Date"
          value={newCalendar.startDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={newCalendar.url}
          onChange={handleChange}
        />
        <button onClick={addOrUpdateCalendar}>
          {editMode ? "Update Calendar" : "Add Calendar"}
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Academic Year</th>
              <th>Course</th>
              <th>Attachment</th>
              <th>Start Date</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((item) => (
              <tr key={item._id}>
                <td>{item.sno}</td>
                <td>{item.academicYear}</td>
                <td>{item.course}</td>
                <td>{item.attachment}</td>
                <td>{item.startDate}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    View Details
                  </a>
                </td>
                <td>
                  <button onClick={() => editCalendar(item)}>Edit</button>
                  <button onClick={() => removeCalendar(item._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarManager;
