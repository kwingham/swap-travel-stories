import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "./User";

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("https://swap-travel-stories-server.onrender.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await fetch(
        `https://swap-travel-stories-server.onrender.com/users/${id}`,
        {
          method: "DELETE",
        }
      );
      setUsers(users.filter((user) => user.user_id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>User Profiles</h2>
      <Link to="/add-user">
        <button>Add New User</button>
      </Link>
      <div className="user-list">
        {users.map((user) => (
          <User key={user.user_id} user={user} onDelete={handleDeleteUser} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
