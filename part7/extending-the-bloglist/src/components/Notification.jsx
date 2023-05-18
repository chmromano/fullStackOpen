import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  return notification ? (
    <div className={`${notification.error ? "error" : "success"}`}>
      {notification.text}
    </div>
  ) : null;
};

Notification.propTypes = {
  message: PropTypes.object,
};

export default Notification;
