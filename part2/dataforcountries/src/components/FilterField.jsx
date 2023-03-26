import React from "react";

const FilterField = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      Find countries: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default FilterField;
