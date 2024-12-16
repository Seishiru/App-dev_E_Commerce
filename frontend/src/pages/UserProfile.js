import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Do no update this
import "../css/UserProfile.css";
import axios from 'axios';
import empty from "../assets/empty_image.png";

function UserProfile() {
  // Ensure user state is initialized with empty strings, not undefined
  const [user, setUser] = useState({
    userId: "",
    name: "",
    username: "",
    email: "",
    contact: "",
  });

  const [addresses, setAddresses] = useState([
    // Dummy address, replace with real data from backend if needed
    {
      receiver: "Ernie Manatad | 091234567890",
      address: "Building 5, House 23, Mango Avenue, Barangay Capitol Site, Cebu City, Cebu, Visayas, 6000"
    }
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT token
        setUser({
          userId: decoded.userId || "", // Ensure userId is part of the token
          name: decoded.name || "",
          username: decoded.username || "",
          email: decoded.email || "",
          contact: decoded.contact || "",
        });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put("http://localhost:5000/api/users/profile", {
        userId: user.userId,
        username: user.username,
        email: user.email,
        contact_number: user.contact,
      });

      alert(response.data.success); // Show success message
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile"); // Show error message
    }
  };

  const handleResetChanges = () => {
    setUser({
      userId: "",
      name: "",
      username: "",
      email: "",
      contact: "",
    });
  };

  return (
    <div className="section-container">
      <h2 className="section-title">My Account</h2>
      <hr />
      <div className="profile-container">
        <div className="profile-left">
          <img src={empty} className="profile-image" alt="Profile" />
        </div>
        <div className="profile-right">
          <div className="profile-item">
            <p>Full Name</p>
            <input
              type="text"
              className="profile-item-input"
              value={user.name} // Display user's name
              readOnly // Make Full Name non-editable
            />
          </div>
          <div className="profile-item">
            <p>Username</p>
            <input
              type="text"
              className="profile-item-input"
              name="username"
              value={user.username} // Controlled input
              onChange={handleChange}
            />
          </div>
          <div className="profile-item">
            <p>Email Address</p>
            <input
              type="email"
              className="profile-item-input"
              name="email"
              value={user.email} // Controlled input
              onChange={handleChange}
            />
          </div>
          <div className="profile-item">
            <p>Contact Number</p>
            <input
              type="text"
              className="profile-item-input"
              name="contact"
              value={user.contact} // Controlled input
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="profile-button-container">
        <button className="profile-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className="profile-button" onClick={handleResetChanges}>
          Reset Changes
        </button>
      </div>

      <h2 className="section-title">My Addresses</h2>
      <hr />
      {addresses.map((address, index) => (
        <div key={index} className="address-item-container">
          <div className="address-contents">
            <div className="address-reciever">
              <h3>{address.receiver}</h3>
              <p>{address.address}</p>
            </div>
          </div>
          <div className="address-button-container">
            <button className="address-button">Edit</button>
            <button className="address-button">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserProfile;
