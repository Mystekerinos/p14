import React, { useState } from "react";
import Select from "react-select";

const DropdownMenu = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Select
      value={selectedOption}
      onChange={setSelectedOption}
      options={options}
    />
  );
};

export default DropdownMenu;
