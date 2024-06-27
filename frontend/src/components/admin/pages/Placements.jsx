import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './placements.css';

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [newPlacement, setNewPlacement] = useState({ company: '', package: 0, count: 0 });
  const [editPlacement, setEditPlacement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placementsRes = await axios.get('http://localhost:3001/placements');
        setPlacements(placementsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddPlacement = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/placements', newPlacement);
      setPlacements([...placements, res.data]);
      setNewPlacement({ company: '', package: 0, count: 0 });
    } catch (error) {
      console.error('Error adding placement:', error);
    }
  };

  const handleUpdatePlacement = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/placements/${editPlacement._id}`, editPlacement);
      setPlacements(placements.map(p => (p._id === editPlacement._id ? res.data : p)));
      setEditPlacement(null);
    } catch (error) {
      console.error('Error updating placement:', error);
    }
  };

  const handleDeletePlacement = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/placements/${id}`);
      setPlacements(placements.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting placement:', error);
    }
  };

  const handleEditClick = (placement) => {
    setEditPlacement(placement);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPlacement({ ...editPlacement, [name]: value });
  };

  return (
    <div className="admin-page-container">
      <h2>Admin Page</h2>

      <div className="admin-section">
        <h3>Add New Placement</h3>
        <input
          type="text"
          placeholder="Company"
          value={newPlacement.company}
          onChange={(e) => setNewPlacement({ ...newPlacement, company: e.target.value })}
        />
        <input
          type="number"
          placeholder="Package"
          value={newPlacement.package}
          onChange={(e) => setNewPlacement({ ...newPlacement, package: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Count"
          value={newPlacement.count}
          onChange={(e) => setNewPlacement({ ...newPlacement, count: parseInt(e.target.value, 10) })}
        />
        <button onClick={handleAddPlacement}>Add Placement</button>
      </div>

      {editPlacement && (
        <div className="admin-section">
          <h3>Edit Placement</h3>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={editPlacement.company}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="package"
            placeholder="Package"
            value={editPlacement.package}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="count"
            placeholder="Count"
            value={editPlacement.count}
            onChange={handleEditChange}
          />
          <button onClick={handleUpdatePlacement}>Update Placement</button>
        </div>
      )}

      <div className="admin-section">
        <h3>Placements</h3>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Package</th>
              <th>Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((placement) => (
              <tr key={placement._id}>
                <td>{placement.company}</td>
                <td>{placement.package} LPA</td>
                <td>{placement.count}</td>
                <td>
                  <button onClick={() => handleEditClick(placement)}>Edit</button>
                  <button onClick={() => handleDeletePlacement(placement._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Placements;
