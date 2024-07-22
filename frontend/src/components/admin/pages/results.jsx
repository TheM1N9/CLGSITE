// src/Results.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./results.css";

const Results = () => {
  const [results, setResults] = useState([]);
  const [newResult, setNewResult] = useState({
    name: "",
    url: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentResultId, setCurrentResultId] = useState(null);
  const fileInputRef = useRef(null);

  const fetchResults = async () => {
    try {
      const response = await axios.get("http://localhost:3001/results");
      setResults(response.data);
      console.log("Fetched results:", response.data);
    } catch (error) {
      console.error("Error fetching results", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "url") {
      setNewResult({ ...newResult, url: files[0] });
    } else {
      setNewResult({ ...newResult, [name]: e.target.value });
    }
  };

  const addOrUpdateResult = async () => {
    try {
      const formData = new FormData();
      for (const key in newResult) {
        formData.append(key, newResult[key]);
      }

      if (editMode) {
        await axios.put(
          `http://localhost:3001/editresult/${currentResultId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:3001/addresult", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setNewResult({
        name: "",
        url: null,
      });
      setEditMode(false);
      fetchResults();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("There was an error!", error.response?.data);
      alert("There was an error: " + error.response?.data?.message);
    }
  };

  const removeResult = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteresult/${id}`);
      fetchResults();
    } catch (error) {
      console.error("Error removing result", error);
    }
  };

  const editResult = (result) => {
    setNewResult({
      name: result.name,
      url: null,
    });
    setCurrentResultId(result._id);
    setEditMode(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Results Manager</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newResult.name}
          onChange={handleChange}
        />
        <input
          type="file"
          name="url"
          placeholder="PDF File"
          onChange={handleChange}
          ref={fileInputRef}
        />
        <button onClick={addOrUpdateResult}>
          {editMode ? "Update Result" : "Add Result"}
        </button>
      </div>
      <ul className="result-list">
        {results.map((result) => (
          <li key={result._id} className="result-item">
            <div className="result-details">
              <h3>{result.name}</h3>
              <a
                href={`data:application/pdf;base64,${result.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </a>
              <div className="result-buttons">
                <button onClick={() => editResult(result)}>Edit</button>
                <button onClick={() => removeResult(result._id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
