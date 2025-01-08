import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  const [interactions, setInteractions] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    meetingType: "Call",
    meetingDate: "",
    notes: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://practical-task-oa5t.onrender.com/interactions");
      setInteractions(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { userName, meetingDate } = formData;
    if (!userName || !meetingDate) {
      setError("All fields are required.");
      return false;
    }
    if (new Date(meetingDate) > new Date()) {
      setError("Meeting date cannot be a future date.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("https://practical-task-oa5t.onrender.com/interactions", formData);
      setFormData({ userName: "", meetingType: "Call", meetingDate: "", notes: "" });
      fetchData();
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">User Details</h1>
      <form onSubmit={handleSubmit} className="interaction-form mt-4">
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            className="form-control"
            placeholder="User Name"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="meetingType">Meeting Type</label>
          <select
            name="meetingType"
            className="form-control"
            value={formData.meetingType}
            onChange={handleChange}
          >
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="meetingDate">Meeting Date</label>
          <input
            type="date"
            name="meetingDate"
            className="form-control"
            value={formData.meetingDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            className="form-control"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add User</button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      <div className="interaction-list mt-5">
        <h2>Applicants History</h2>
        <ul className="list-group">
          {interactions.sort((a, b) => new Date(b.meetingDate) - new Date(a.meetingDate)).map((interaction) => (
            <li key={interaction._id} className="list-group-item">
              <p><strong>User Name:</strong> {interaction.userName}</p>
              <p><strong>Meeting Type:</strong> {interaction.meetingType}</p>
              <p><strong>Meeting Date:</strong> {interaction.meetingDate}</p>
              <p><strong>Important Notes:</strong> {interaction.notes}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
