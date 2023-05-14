import PropTypes from "prop-types";
import React from "react";

const Notification = ({ message }) => {
  return message ? (
    <div className={`${message.error ? "error" : "success"}`}>
      {message.text}
    </div>
  ) : null;
};

Notification.propTypes = {
  message: PropTypes.object,
};

export default Notification;
