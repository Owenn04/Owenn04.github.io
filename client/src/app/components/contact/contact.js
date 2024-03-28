"use client"

import React, { useState } from 'react';

import './contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
        //Put data into json object
        const formData = {
            name: name,
            email: email,
            message: message
        };

        console.log(formData)

        //send data to endpoint as json
        await fetch('http://localhost:3002/api/contact/get', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(response => {
            if (response.ok) {
              console.log('Form data sent successfully');
              setEmailError('');
              setName('');
              setEmail('');
              setMessage('');
            } else {
              throw new Error('Failed to send form data');
            }
          })
          .catch(error => {
            console.error('Error sending form data:', error);
          });
    }
  };

  return (
    <div className="main">
      <div className="info">
        <div>
          <img src="images/icons/insta.png" alt="Instagram" />
          <h2>Instagram</h2>
          <h7>@qudancemarathon</h7>
        </div>
        <div>
          <img src="images/icons/email.png" alt="Email" />
          <h2>Email</h2>
          <h7>qudm@clubs.queensu.ca</h7>
        </div>
        <div>
          <img src="images/icons/tiktok.png" alt="TikTok" />
          <h2>Tiktok</h2>
          <h7>@qudancemarathon</h7>
        </div>
      </div>
      <div className="form-box">
        <h2>Leave a Message</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;