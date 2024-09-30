// src/components/UserList.jsx

import React, { useEffect, useState } from "react";
import UpdateUser from "./UpdateUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (!response.ok) throw new Error("Failed to fetch users.");
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []); // Ensure users is an array
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Refresh user list after update
  const handleUpdate = () => {
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div>
      <h2>User List</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>
                {user.username} - {user.email}
              </span>
              <button onClick={() => setEditingUser(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {editingUser && (
        <div>
          <h3>Editing User: {editingUser.username}</h3>
          <UpdateUser user={editingUser} onUpdate={handleUpdate} />
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
