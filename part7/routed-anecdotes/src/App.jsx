import React, { useState } from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import About from "./components/About";
import Anecdote from "./components/Anecdote";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Notification from "./components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 1,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(
      `Successfully added anecdote "${anecdote.content}" by ${anecdote.author}`
    );
    setTimeout(() => setNotification(""), 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const match = useMatch("/anecdotes/:id");
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null;

  return (
    <>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification content={notification} />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
