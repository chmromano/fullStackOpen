import React, { useState } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/client";

import useField from "../hooks/useField";

import { EDIT_AUTHOR } from "../graphql/mutations";
import { ALL_AUTHORS } from "../graphql/queries";

const SetBirthYear = ({ authors }) => {
  const { reset: resetBorn, ...born } = useField("number");

  const [selectedOption, setSelectedOption] = useState(null);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    console.log(selectedOption);

    editAuthor({
      variables: {
        name: selectedOption.value,
        setBornTo: Number(born.value),
      },
    });

    resetBorn();
  };

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  return (
    <>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          Birth year
          <input {...born} />
        </div>
        <button type="submit">Update author</button>
      </form>
    </>
  );
};

export default SetBirthYear;
