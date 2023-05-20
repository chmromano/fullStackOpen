import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (!notification) {
    return null;
  }

  return (
    <div className={`${notification.error ? "error" : "success"}`}>
      {notification.text}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.object,
};

export default Notification;
