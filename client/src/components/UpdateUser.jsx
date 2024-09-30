import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/users/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setFormData({ username: data.username, email: data.email })
      )
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8080/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
