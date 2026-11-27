import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ⚠️ YOUR LIVE RENDER API URL
  const API_URL = "https://my-web-experiments-niun.onrender.com";

  const handleRegister = async () => {
    setMessage("Connecting...");
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setMessage("Server Error: " + (data.message || "Unknown error"));
        return;
      }
      
      setMessage(data.message || "Registered successfully!");
    } catch (error) {
      setMessage("Network Error: " + error.message);
    }
  };

  const handleLogin = async () => {
    setMessage("Logging in...");
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setMessage("Server Error: " + (data.message || "Unknown error"));
        return;
      }

      if (data.token) {
        setMessage("Login Successful! Token received.");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Network Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "50px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>MERN Stack Full-Stack Test</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px", border: "1px solid #ccc" }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px", border: "1px solid #ccc" }}
        />
      </div>

      <button onClick={handleRegister} style={{ padding: "10px 20px", marginRight: "10px", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>Register</button>
      <button onClick={handleLogin} style={{ padding: "10px 20px", background: "#28a745", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>Login</button>

      <h3 style={{ marginTop: "20px", color: "#6c5ce7" }}>{message}</h3>
    </div>
  );
}

export default App;