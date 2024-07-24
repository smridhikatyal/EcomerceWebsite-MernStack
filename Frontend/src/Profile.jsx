import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import axiosInstance from './axiosConfig';
import './Profile.css';
const Profile = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: ''
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', profile.firstName);
        formData.append('lastName', profile.lastName);
        formData.append('phoneNumber', profile.phoneNumber);
        formData.append('address', profile.address);
        formData.append('email', profile.email);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.post('/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Include the JWT token here
                }
            });
            setProfile(response.data.user);
            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile.');
        }
    };

    return (
      <div className="profile-container">
      <div className="profile-form">

      <h2>{t('profile.title')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('profile.firstName')}:</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t('profile.last_name')}:</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t('profile.phone_number')}:</label>
          <input
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t('profile.address')}:</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t('profile.email')}:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t('profile.profile_picture')}:</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">{t('profile.save_profile')}</button>
      </form>
      {message && <p>{message}</p>}
    </div>

    </div>

    );
};

export default Profile;
/* <div>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label></label>
                    <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        name="profilePicture"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Save Profile</button>
            </form>
            {message && <p>{message}</p>}
        </div> */