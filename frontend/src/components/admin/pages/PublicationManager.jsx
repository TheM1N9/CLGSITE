import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./publicationManager.css";

const PublicationManager = () => {
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [newColumn, setNewColumn] = useState("");
  const [newRow, setNewRow] = useState({});
  const [newPdf, setNewPdf] = useState({ name: "", link: null });
  const [editMode, setEditMode] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [currentPdfId, setCurrentPdfId] = useState(null);
  const fileInputRef = useRef(null);

  const fetchColumns = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pubcol");
      setColumns(response.data[0]); // Assuming only one columns document
    } catch (error) {
      console.error("Error fetching columns", error);
    }
  };

  const fetchTableData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pubdata");
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching table data", error);
    }
  };

  const fetchPdfs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pubpdf");
      setPdfs(response.data);
    } catch (error) {
      console.error("Error fetching PDFs", error);
    }
  };

  useEffect(() => {
    fetchColumns();
    fetchTableData();
    fetchPdfs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handlePdfChange = (e) => {
    const { name, files } = e.target;
    if (name === "link") {
      setNewPdf({ ...newPdf, link: files[0] });
    } else {
      setNewPdf({ ...newPdf, [name]: e.target.value });
    }
  };

  const addOrUpdateRow = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/edittabledata/${currentRowId}`, newRow);
      } else {
        await axios.post("http://localhost:3001/addtabledata", newRow);
      }
      setNewRow({});
      setEditMode(false);
      fetchTableData();
    } catch (error) {
      console.error("There was an error!", error.response?.data);
      alert("There was an error: " + error.response?.data?.message);
    }
  };

  const addOrUpdatePdf = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newPdf.name);
      if (newPdf.link) {
        formData.append("link", newPdf.link);
      }

      if (editMode) {
        await axios.put(`http://localhost:3001/editpdf/${currentPdfId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:3001/addpdf", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setNewPdf({ name: "", link: null });
      setEditMode(false);
      fetchPdfs();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("There was an error!", error.response?.data);
      alert("There was an error: " + error.response?.data?.message);
    }
  };

  const addColumn = async () => {
    try {
      const updatedColumns = { ...columns, [`c${Object.keys(columns).length}`]: newColumn };
      await axios.put(`http://localhost:3001/editcolumns/${columns._id}`, updatedColumns);
      setNewColumn("");
      fetchColumns();
    } catch (error) {
      console.error("Error adding column", error);
    }
  };

  const removeRow = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deletetabledata/${id}`);
      fetchTableData();
    } catch (error) {
      console.error("Error removing row", error);
    }
  };

  const removePdf = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deletepdf/${id}`);
      fetchPdfs();
    } catch (error) {
      console.error("Error removing PDF", error);
    }
  };

  const editRow = (row) => {
    setNewRow(row);
    setCurrentRowId(row._id);
    setEditMode(true);
  };

  const editPdf = (pdf) => {
    setNewPdf(pdf);
    setCurrentPdfId(pdf._id);
    setEditMode(true);
  };

  return (
    <div className="App">
      <div className="column-form-container">
        <h1>Publication Columns Management </h1>
        <input
          type="text"
          name="newColumn"
          placeholder="New Column Name"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
        />
        <button onClick={addColumn}>Add Column</button>
      </div>
      <div className="form-container">
        <h1>Publication Table Data</h1>
        {Object.keys(columns).map((col, index) => (
          col !== '_id' && (
            <input
              key={index}
              type="text"
              name={col}
              placeholder={columns[col]}
              value={newRow[col] || ""}
              onChange={(e) => handleChange(e)}
            />
          )
        ))}
        <button onClick={addOrUpdateRow}>
          {editMode ? "Update Row" : "Add Row"}
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {Object.keys(columns).map((col, index) => (
                col !== '_id' && <th key={index}>{columns[col]}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row._id}>
                {Object.keys(columns).map((col, index) => (
                  col !== '_id' && <td key={index}>{row[col]}</td>
                ))}
                <td>
                  <button onClick={() => editRow(row)}>Edit</button>
                  <button onClick={() => removeRow(row._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pdf-form-container">
        <h1>Publication PDFs</h1>
        <input
          type="text"
          name="name"
          placeholder="PDF Name"
          value={newPdf.name}
          onChange={handlePdfChange}
        />
        <input
          type="file"
          name="link"
          placeholder="PDF File"
          onChange={handlePdfChange}
          ref={fileInputRef}
        />
        <button onClick={addOrUpdatePdf}>
          {editMode ? "Update PDF" : "Add PDF"}
        </button>
      </div>
      <div className="pdf-table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pdfs.map((pdf) => (
              <tr key={pdf._id}>
                <td>{pdf.name}</td>
                <td>
                  <a
                    href={`data:application/pdf;base64,${pdf.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </td>
                <td>
                  <button onClick={() => editPdf(pdf)}>Edit</button>
                  <button onClick={() => removePdf(pdf._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublicationManager;
