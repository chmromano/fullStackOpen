import React from "react";

const Filter = (props) => {
  console.log(props);
  const { filter, setFilter } = props;

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      Filter name: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
