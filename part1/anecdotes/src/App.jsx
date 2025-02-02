import React, { useState } from "react";

const Button = (props) => {
  console.log(props);
  const { handleClick, text } = props;
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(8));

  const handleVote = () => {
    const copy = [...points];
    console.log("Before:", copy);
    copy[selected] += 1;
    console.log("After:", copy);
    setPoints(copy);
  };

  const handleNextAnecdote = () => {
    // range from 0 to 8
    const number = Math.floor(Math.random() * 8);
    console.log(number);
    setSelected(number);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[points.indexOf(Math.max(...points))]}</div>
      <div>has {Math.max(...points)} votes</div>
    </>
  );
};

export default App;
