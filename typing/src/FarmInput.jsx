import React, { useState } from "react";
import "./FarmInput.css";

const FarmInput = () => {
  const [farmData, setFarmData] = useState({
    name: "",
    type: "Livestock",
    location: "",
  });

  const handleChange = (e) => {
    setFarmData({ ...farmData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Farm Data Submitted:", farmData);
    alert("Farm details submitted successfully!");
  };

  return (
    <div className="farm-container">
      <h2>Farm Input Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Farm Name:</label>
        <input
          type="text"
          name="name"
          value={farmData.name}
          onChange={handleChange}
          required
        />

        <label>Farm Type:</label>
        <select name="type" value={farmData.type} onChange={handleChange}>
          <option value="Livestock">Livestock</option>
          <option value="Crops">Crops</option>
          <option value="Mixed">Mixed</option>
        </select>

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={farmData.location}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FarmInput;
