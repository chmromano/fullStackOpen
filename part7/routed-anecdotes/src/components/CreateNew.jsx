import React from "react";
import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";

const CreateNew = ({ addNew }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = (event) => {
    event.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content:
          <input {...content} />
        </div>
        <div>
          Author:
          <input {...author} />
        </div>
        <div>
          Url for more info:
          <input {...info} />
        </div>
        <button>Create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </>
  );
};

export default CreateNew;
