import PropTypes from "prop-types";
import React from "react";

const LoggedUser = ({ user, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      <p>
        Logged in as {user.username}
        <br />
        <button id="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </p>
    </>
  );
};

LoggedUser.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoggedUser;
