import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const LoggedUser = ({ user, onLogout }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    onLogout();
    dispatch(
      setNotification({ error: false, text: "Successfully logged out" }, 5000)
    );
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
