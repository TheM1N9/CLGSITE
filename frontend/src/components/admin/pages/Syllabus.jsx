import React, { useState, useEffect } from "react";
import axios from "axios";
import "./syllabus.css";

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [newSyllabus, setNewSyllabus] = useState({
    id: "",
    coursesName: "",
    courTeacher: {
      y1: [{ name: "", url: "" }],
      y2: [{ name: "", url: "" }],
      y3: [{ name: "", url: "" }],
      y4: [{ name: "", url: "" }],
    },
  });
  const [editMode, setEditMode] = useState(false);
  const [currentSyllabusId, setCurrentSyllabusId] = useState(null);

  const fetchSyllabus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/syllabus");
      setSyllabus(response.data);
    } catch (error) {
      console.error("Error fetching syllabus", error);
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const handleChange = (e, key, year = null, index = null) => {
    const { name, value } = e.target;
    if (year && index !== null) {
      const updatedYear = [...newSyllabus.courTeacher[year]];
      updatedYear[index][name] = value;
      setNewSyllabus({
        ...newSyllabus,
        courTeacher: { ...newSyllabus.courTeacher, [year]: updatedYear },
      });
    } else {
      setNewSyllabus({ ...newSyllabus, [name]: value });
    }
  };

  const addOrUpdateSyllabus = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/editsyllabus/${currentSyllabusId}`,
          newSyllabus
        );
      } else {
        await axios.post("http://localhost:3001/addsyllabus", newSyllabus);
      }
      setNewSyllabus({
        id: "",
        coursesName: "",
        courTeacher: {
          y1: [{ name: "", url: "" }],
          y2: [{ name: "", url: "" }],
          y3: [{ name: "", url: "" }],
          y4: [{ name: "", url: "" }],
        },
      });
      setEditMode(false);
      fetchSyllabus();
    } catch (error) {
      console.error("There was an error!", error.response?.data);
      alert("There was an error: " + error.response?.data?.message);
    }
  };

  const removeSyllabus = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deletesyllabus/${id}`);
      fetchSyllabus();
    } catch (error) {
      console.error("Error removing syllabus", error);
    }
  };

  const editSyllabus = (syllabusItem) => {
    setNewSyllabus({
      id: syllabusItem.id || "",
      coursesName: syllabusItem.coursesName || "",
      courTeacher: {
        y1: syllabusItem.courTeacher[0].y1?.length ? syllabusItem.courTeacher[0].y1 : [{ name: "", url: "" }],
        y2: syllabusItem.courTeacher[0].y2?.length ? syllabusItem.courTeacher[0].y2 : [{ name: "", url: "" }],
        y3: syllabusItem.courTeacher[0].y3?.length ? syllabusItem.courTeacher[0].y3 : [{ name: "", url: "" }],
        y4: syllabusItem.courTeacher[0].y4?.length ? syllabusItem.courTeacher[0].y4 : [{ name: "", url: "" }],
      },
    });
    setCurrentSyllabusId(syllabusItem._id);
    setEditMode(true);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Syllabus Manager</h1>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={newSyllabus.id}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="coursesName"
          placeholder="Course Name"
          value={newSyllabus.coursesName}
          onChange={(e) => handleChange(e)}
        />
        {["y1", "y2", "y3", "y4"].map((year) => (
          <div key={year}>
            <h3>{`${year.toUpperCase()} Syllabus`}</h3>
            {newSyllabus.courTeacher[year].map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  placeholder="Syllabus Name"
                  value={item.name}
                  onChange={(e) => handleChange(e, "courTeacher", year, index)}
                />
                <input
                  type="text"
                  name="url"
                  placeholder="Syllabus URL"
                  value={item.url}
                  onChange={(e) => handleChange(e, "courTeacher", year, index)}
                />
              </div>
            ))}
          </div>
        ))}
        <button onClick={addOrUpdateSyllabus}>
          {editMode ? "Update Syllabus" : "Add Syllabus"}
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Year</th>
              <th>Syllabus Name</th>
              <th>Syllabus URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {syllabus.map((item) => (
              <React.Fragment key={item._id}>
                {["y1", "y2", "y3", "y4"].map((year) => (
                  item.courTeacher[0][year].map((syllabusItem, index) => (
                    <tr key={index}>
                      {index === 0 && (
                        <>
                          <td rowSpan={item.courTeacher[0][year].length}>{item.id}</td>
                          <td rowSpan={item.courTeacher[0][year].length}>{item.coursesName}</td>
                          <td rowSpan={item.courTeacher[0][year].length}>{year.toUpperCase()}</td>
                        </>
                      )}
                      <td>{syllabusItem.name}</td>
                      <td>
                        <a href={syllabusItem.url} target="_blank" rel="noopener noreferrer">
                          View Syllabus
                        </a>
                      </td>
                      <td>
                        <button onClick={() => editSyllabus(item)}>Edit</button>
                        <button onClick={() => removeSyllabus(item._id)}>Remove</button>
                      </td>
                    </tr>
                  ))
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Syllabus;
