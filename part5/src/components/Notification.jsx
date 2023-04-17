import React from "react";

const Notification = ({ message }) => {
  return message ? (
    <div className={`${message.error ? "error" : "success"}`}>
      {message.text}
    </div>
  ) : null;
};

export default Notification;
