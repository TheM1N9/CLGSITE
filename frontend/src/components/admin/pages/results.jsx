// src/Results.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./results.css";

const Results = () => {
  const [results, setResults] = useState([]);
  const [newResult, setNewResult] = useState({
    name: "",
    url: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentResultId, setCurrentResultId] = useState(null);

  const fetchResults = async () => {
    try {
      const response = await axios.get("http://localhost:3001/results");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleChange = (e) => {
    setNewResult({ ...newResult, [e.target.name]: e.target.value });
  };

  const addOrUpdateResult = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/editresult/${currentResultId}`,
          newResult
        );
      } else {
        await axios.post("http://localhost:3001/addresult", newResult);
      }
      setNewResult({
        name: "",
        url: "",
      });
      setEditMode(false);
      fetchResults();
    } catch (error) {
      console.error("There was an error!", error.response.data);
      alert("There was an error: " + error.response.data.message);
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
    setNewResult(result);
    setCurrentResultId(result._id);
    setEditMode(true);
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
          type="text"
          name="url"
          placeholder="URL"
          value={newResult.url}
          onChange={handleChange}
        />
        <button onClick={addOrUpdateResult}>
          {editMode ? "Update Result" : "Add Result"}
        </button>
      </div>
      <ul className="result-list">
        {results.map((result) => (
          <li key={result._id} className="result-item">
            <div className="adminedit-details">
              <h3>{result.name}</h3>
              {/* <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.url}
              </a> */}
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
