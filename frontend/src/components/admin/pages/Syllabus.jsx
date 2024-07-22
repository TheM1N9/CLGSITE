import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./syllabus.css";

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [newSyllabus, setNewSyllabus] = useState({
    id: "",
    coursesName: "",
    courTeacher: {
      y1: [{ name: "", file: null }],
      y2: [{ name: "", file: null }],
      y3: [{ name: "", file: null }],
      y4: [{ name: "", file: null }],
    },
  });
  const [editMode, setEditMode] = useState(false);
  const [currentSyllabusId, setCurrentSyllabusId] = useState(null);
  const fileInputRefs = useRef({ y1: [], y2: [], y3: [], y4: [] });

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

  const handleChange = (e, year = null, index = null) => {
    const { name, value, files } = e.target;
    if (year && index !== null) {
      const updatedYear = [...newSyllabus.courTeacher[year]];
      if (name === "file") {
        updatedYear[index][name] = files[0];
      } else {
        updatedYear[index]["name"] = value;
      }
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
      const formData = new FormData();
      formData.append("id", newSyllabus.id);
      formData.append("coursesName", newSyllabus.coursesName);

      ["y1", "y2", "y3", "y4"].forEach((year) => {
        newSyllabus.courTeacher[year].forEach((item, index) => {
          formData.append(`${year}Name`, item.name);
          if (item.file) {
            formData.append(year, item.file);
          }
        });
      });

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      if (editMode) {
        await axios.put(
          `http://localhost:3001/editsyllabus/${currentSyllabusId}`,
          formData,
          config
        );
      } else {
        await axios.post("http://localhost:3001/addsyllabus", formData, config);
      }

      // Reset form fields after submission
      setNewSyllabus({
        id: "",
        coursesName: "",
        courTeacher: {
          y1: [{ name: "", file: null }],
          y2: [{ name: "", file: null }],
          y3: [{ name: "", file: null }],
          y4: [{ name: "", file: null }],
        },
      });
      setEditMode(false);
      fetchSyllabus(); // Fetch updated syllabus list
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
        y1: syllabusItem.courTeacher.y1?.length
          ? syllabusItem.courTeacher.y1.map((s) => ({
              name: s.name,
              file: null,
            }))
          : [{ name: "", file: null }],
        y2: syllabusItem.courTeacher.y2?.length
          ? syllabusItem.courTeacher.y2.map((s) => ({
              name: s.name,
              file: null,
            }))
          : [{ name: "", file: null }],
        y3: syllabusItem.courTeacher.y3?.length
          ? syllabusItem.courTeacher.y3.map((s) => ({
              name: s.name,
              file: null,
            }))
          : [{ name: "", file: null }],
        y4: syllabusItem.courTeacher.y4?.length
          ? syllabusItem.courTeacher.y4.map((s) => ({
              name: s.name,
              file: null,
            }))
          : [{ name: "", file: null }],
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
                  onChange={(e) => handleChange(e, year, index)}
                />
                <input
                  type="file"
                  name="file"
                  onChange={(e) => handleChange(e, year, index)}
                  ref={(el) => (fileInputRefs.current[year][index] = el)}
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
              <th>Syllabus File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {syllabus.map((item) => (
              <React.Fragment key={item._id}>
                {["y1", "y2", "y3", "y4"].map((year) =>
                  item.courTeacher[0][year].map((syllabusItem, index) => (
                    <tr key={index}>
                      {index === 0 && (
                        <>
                          <td rowSpan={item.courTeacher[0][year].length}>
                            {item.id}
                          </td>
                          <td rowSpan={item.courTeacher[0][year].length}>
                            {item.coursesName}
                          </td>
                          <td rowSpan={item.courTeacher[0][year].length}>
                            {year.toUpperCase()}
                          </td>
                        </>
                      )}
                      <td>{syllabusItem.name}</td>
                      <td>
                        <a
                          href={`data:application/pdf;base64,${syllabusItem.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View File
                        </a>
                      </td>
                      <td>
                        <button onClick={() => editSyllabus(item)}>Edit</button>
                        <button onClick={() => removeSyllabus(item._id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Syllabus;
