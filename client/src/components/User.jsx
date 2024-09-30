import React from "react";
import { Link } from "react-router-dom";

function User({ user, onDelete }) {
  const handleDelete = () => {
    onDelete(user.user_id);
  };

  return (
    <div className="user-card">
      <h3>{user.username}</h3>
      <p>{user.email}</p>
      <div className="button-group">
        <Link to={`/update-user/${user.user_id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default User;
