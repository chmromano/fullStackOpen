import React from "react";

const Notification = ({ content }) => {
  return content === "" ? null : <>{content}</>;
};

export default Notification;
