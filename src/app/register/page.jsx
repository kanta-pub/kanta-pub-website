"use client"
import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone:'',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const  handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                // console.log('Registration successful:', data);
                // Redirect to the login page or another page
            } else {
                console.error('Registration failed:', data);
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
        }
        // Here you would typically handle the form submission, e.g., send the data to your server
        // console.log('Form data submitted:', formData);
    };

    return (
        <div>
            <h2>Register:</h2>
            <form onSubmit={handleSubmit}>
            <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;