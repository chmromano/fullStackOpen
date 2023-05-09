import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";

const CreateNew = ({ addNew }) => {
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");

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
        <button>create</button>
      </form>
    </>
  );
};

export default CreateNew;
