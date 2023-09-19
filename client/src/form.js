// client/src/components/Form.js
import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the backend to add data
    axios.post('/addData', formData)
      .then((response) => {
        console.log(response.data);
        // Reset the form
        setFormData({ name: '', email: '' });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
