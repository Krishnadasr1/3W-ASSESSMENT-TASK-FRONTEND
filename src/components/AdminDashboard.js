import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://threew-assessment-task-backend.onrender.com/api/v1/admin/getUsers');
        setUsers(response.data);
      } catch (error) {
        alert('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); 
  };

  const closeModal = () => {
    setSelectedImage(null); 
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Social Media Handle</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.socialMediaHandle}</td>
              <td>
                {user.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`User Upload ${idx}`}
                    width="50"
                    style={{ margin: '5px', cursor: 'pointer' }}
                    onClick={() => handleImageClick(image)} 
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={closeModal} 
        >
          <img
            src={selectedImage}
            alt="Enlarged Preview"
            style={{
              minWidth: '55%',
              minHeight: '90%',
              // border: '2px solid red',
              // borderRadius: '8px',
              objectFit:'fill'
            }}
          />
        </div>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/">Go to Submission Form</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
