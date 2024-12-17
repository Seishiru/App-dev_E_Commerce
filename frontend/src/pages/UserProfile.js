import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Do not update this
import "../css/UserProfile.css";
import axios from 'axios';
import empty from "../assets/empty_image.png";
import homeIcon from "../assets/home_icon.png"; // Assuming you have a home icon image

function UserProfile() {
  const [user, setUser] = useState({
    user_id: "",
    name: "",
    username: "",
    email: "",
    contact: "",
  });

  const [addresses, setAddresses] = useState([]);

  const [newAddress, setNewAddress] = useState({
    receiver: "",
    address: "",
    phoneNumber: "",
    type: "Home", // Default to 'Home' address type
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token); // Debugging the token in localStorage

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT token
        console.log("Decoded Token:", decoded); // Debugging the decoded token

        setUser({
          user_id: decoded.id || "", // Use decoded.id instead of user_id
          name: decoded.name || "",
          username: decoded.username || "",
          email: decoded.email || "",
          contact: decoded.contact || "",
        });

        // Check if the user_id is set correctly
        console.log("User ID set in state:", decoded.id);

        // Fetch addresses for the logged-in user
        fetchAddresses(decoded.id); // Pass decoded.id instead of user_id
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Token not found in localStorage");
    }
  }, []);

  const fetchAddresses = async (user_id) => {
    console.log("Fetching addresses for user_id:", user_id); // Debugging user_id passed to fetchAddresses

    try {
      if (!user_id) {
        throw new Error("User ID is not available");
      }

      const token = localStorage.getItem("token");
      console.log("Token being sent with request:", token); // Debugging token being used in request
      
      // const response = await axios.get(`http://localhost:5000/api/users/${user_id}/addresses`, {
        const response = await axios.get(`http://localhost:5000/api/${user_id}/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log(response); // Debugging the fetched addresses
      setAddresses(response.data || []); // Set the fetched addresses
    } catch (error) {
      console.error("Error fetching addresses:", error);
      alert("Failed to fetch addresses");
    }
  };

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
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        contact_number: user.contact,
      });

      alert(response.data.success);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleResetChanges = () => {
    setUser({
      user_id: "",
      name: "",
      username: "",
      email: "",
      contact: "",
    });
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/${user.user_id}/addresses/${addressId}`);
      setAddresses((prevAddresses) => prevAddresses.filter(address => address.id !== addressId));
      alert("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address");
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/users/${user.user_id}/addresses`, newAddress, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token in the header
        }
      });
      console.log("New Address Added:", response.data); // Debugging the newly added address response
      setAddresses((prevAddresses) => [...prevAddresses, response.data.newAddress]);
      setNewAddress({ receiver: "", address: "", phoneNumber: "", type: "Home" }); // Reset form
      alert("Address added successfully");
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address");
    }
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
              readOnly
            />
          </div>
          <div className="profile-item">
            <p>Username</p>
            <input
              type="text"
              className="profile-item-input"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="profile-item">
            <p>Email Address</p>
            <input
              type="email"
              className="profile-item-input"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="profile-item">
            <p>Contact Number</p>
            <input
              type="text"
              className="profile-item-input"
              name="contact"
              value={user.contact}
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
      <div className="address-container">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address.id} className="address-card">
              <div className="address-left">
                <img src={homeIcon} alt="Home" className="address-image" />
              </div>
              <div className="address-right">
                <div className="address-reciever">
                  <h3>{address.receiver}</h3>
                  <p>{address.address}</p>
                  <span>{address.type}</span>
                </div>
                <div className="address-button-container">
                  <button className="address-button">Edit</button>
                  <button className="address-button" onClick={() => handleDeleteAddress(address.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </div>

      <h3 className="section-title">Add New Address</h3>
      <form onSubmit={handleAddAddress} className="address-form">
        <div className="form-item">
          <label>Receiver</label>
          <input
            type="text"
            name="receiver"
            value={newAddress.receiver}
            onChange={(e) => setNewAddress({ ...newAddress, receiver: e.target.value })}
            required
          />
        </div>
        <div className="form-item">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
            required
          />
        </div>
        <div className="form-item">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={newAddress.phoneNumber}
            onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
            required
          />
        </div>
        <div className="form-item">
          <label>Address Type</label>
          <select
            name="type"
            value={newAddress.type}
            onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
            required
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="address-button">Add Address</button>
      </form>
    </div>
  );
}

export default UserProfile;
