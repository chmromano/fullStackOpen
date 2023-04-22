import React from "react";
import { useNotificationValue } from "../notificationContext";

const Notification = () => {
  const value = useNotificationValue();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return value === "" ? null : <div style={style}>{value}</div>;
};

export default Notification;
