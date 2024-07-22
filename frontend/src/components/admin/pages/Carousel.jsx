import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import "./carouselManager.css";

const CarouselManager = () => {
  const [carousel, setCarousel] = useState([]);
  const [newCarousel, setNewCarousel] = useState({
    src: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentCarouselId, setCurrentCarouselId] = useState(null);
  const fileInputRef = useRef(null);

  const fetchCarousel = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cimages");
      setCarousel(response.data);
    } catch (error) {
      console.error("Error fetching carousel", error);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "src") {
      setNewCarousel({ ...newCarousel, [name]: files[0] });
    }
  };

  const addOrUpdateCarousel = async () => {
    try {
      const formData = new FormData();
      formData.append("src", newCarousel.src);

      if (editMode) {
        await axios.put(
          `http://localhost:3001/editcarousel/${currentCarouselId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:3001/addcarousel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setNewCarousel({ src: null });
      setEditMode(false);
      fetchCarousel();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("There was an error!", error.response?.data);
      alert("There was an error: " + error.response?.data?.message);
    }
  };

  const removeCarousel = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deletecarousel/${id}`);
      fetchCarousel();
    } catch (error) {
      console.error("Error removing carousel", error);
    }
  };

  const editCarousel = (carouselItem) => {
    setNewCarousel({
      src: null,
    });
    setCurrentCarouselId(carouselItem._id);
    setEditMode(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Carousel Manager</h1>
        <input
          type="file"
          name="src"
          placeholder="Image Source"
          onChange={handleChange}
          ref={fileInputRef}
        />

        <button onClick={addOrUpdateCarousel}>
          {editMode ? "Update Carousel" : "Add Carousel"}
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carousel.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${item.src}`}
                    alt=""
                    style={{ width: "100px" }}
                  />
                </td>
                <td>
                  <button onClick={() => editCarousel(item)}>Edit</button>
                  <button onClick={() => removeCarousel(item._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarouselManager;
