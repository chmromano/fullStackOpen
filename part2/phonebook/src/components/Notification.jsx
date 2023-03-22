const Notification = (props) => {
  console.log(props);
  const { successMessage } = props;

  if (successMessage === null) {
    return null;
  }

  return <div className="success">{successMessage}</div>;
};

export default Notification;
