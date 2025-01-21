import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialMediaHandle, setSocialMediaHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialMediaHandle', socialMediaHandle);
    images.forEach((image) => formData.append('images', image));

    try {
      await axios.post('http://localhost:5000/api/v1/user/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Data submitted successfully!');
    } catch (error) {
      alert('Failed to submit data.');
    }
  };

  return (
    <div>
      <h1>Submit User Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Social Media Handle:</label>
          <input
            type="text"
            value={socialMediaHandle}
            onChange={(e) => setSocialMediaHandle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <h3>Selected Images:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {images.map((image, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    transform: 'translate(50%, -50%)',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div style={{ marginTop: '20px',marginLeft:'45%' }}>
        <Link to="/dashboard">Go to Admin Dashboard</Link>
      </div>
    </div>
  );
};

export default UserForm;
