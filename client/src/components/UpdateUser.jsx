import React, { useState } from "react";

const UpdateUser = ({ user, onUpdate }) => {
  const [email, setEmail] = useState(user.email); // Start with the current email
  const [username, setUsername] = useState(user.username); // Start with the current username
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Make a PUT request to update the user
      const response = await fetch(
        `http://localhost:5000/users/${user.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username }), // Sending the updated email and username
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("User updated:", data);
        onUpdate(); // Call the parent function to refresh the user list
      } else {
        console.error("Error updating user:", data.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Update User</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default UpdateUser;
