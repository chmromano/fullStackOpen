import React from "react";

const LoggedUser = ({ user, handleLogout }) => (
  <>
    <p>
      Logged in as {user.name}
      <button onClick={handleLogout}>Logout</button>
    </p>
  </>
);

export default LoggedUser;
