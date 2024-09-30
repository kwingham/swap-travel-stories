import React from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

const App = () => {
  return (
    <div>
      <h1>Welcome to Swap Travel Stories</h1>
      <AddUser />
      <UserList />
    </div>
  );
};

export default App;
