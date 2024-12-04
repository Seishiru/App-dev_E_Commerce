import React from "react";
import "../css/UserProfile.css";
import empty from "../assets/empty_image.png";

function UserProfile() {
  return (
    <div className="section-container">
      <h2 className="section-title">My Account</h2>
      <hr />
      <div className="profile-container">
        <div className="profile-left">
          <img src={empty} className="profile-image" />
        </div>
        <div className="profile-right">
          <div className="profile-item">
            <p>Full Name</p>
            <input
              type="text"
              className="profile-item-input"
              value="Ernie Manatad"
            />
          </div>
          <div className="profile-item">
            <p>Username</p>
            <input type="text" className="profile-item-input" value="Ernie" />
          </div>
          <div className="profile-item">
            <p>Email Address</p>
            <input
              type="text"
              className="profile-item-input"
              value="erniemanatad@gmail.com"
            />
          </div>
          <div className="profile-item">
            <p>Contact Number</p>
            <input
              type="text"
              className="profile-item-input"
              value="091234567890"
            />
          </div>
        </div>
      </div>
      <div className="profile-button-container">
        <button className="profile-button">Save Changes</button>
        <button className="profile-button">Reset Changes</button>
      </div>

      <h2 className="section-title">My Addresses</h2>
      <hr />
      <div className="address-item-container">
        <div className="address-contents">
          <div className="address-reciever">
            <h3>Ernie Manatad | 091234567890</h3>
            <p>Building 5, House 23, Mango Avenue, Barangay Capitol Site, Cebu City, Cebu, Visayas, 6000</p>
          </div>
        </div>
        <div className="address-button-container">
          <button className="address-button">Edit</button>
          <button className="address-button">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
