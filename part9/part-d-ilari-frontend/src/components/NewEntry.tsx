import { useState } from "react";

import useField from "../hooks/useField";
import { createDiaryEntry } from "../services/diaryService";
import { DiaryEntry, Visibility, Weather } from "../types";

import Notify from "./Notify";
import axios from "axios";

interface NewEntryProps {
  newDiaryHandler: (entry: DiaryEntry) => void;
}

const NewEntry = ({ newDiaryHandler }: NewEntryProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { reset: resetDate, ...date } = useField("text");
  const { reset: resetVisibility, ...visibility } = useField("text");
  const { reset: resetWeather, ...weather } = useField("text");
  const { reset: resetComment, ...comment } = useField("text");

  const resetForm = () => {
    resetDate();
    resetVisibility();
    resetWeather();
    resetComment();
  };

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const addDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newDiaryEntry = await createDiaryEntry({
        date: date.value,
        visibility: visibility.value as Visibility,
        weather: weather.value as Weather,
        comment: comment.value,
      });
      newDiaryHandler(newDiaryEntry);
      resetForm();
    } catch (error: unknown) {
      let errorMessage = "Something bad happened.";

      if (axios.isAxiosError(error) && error.response && error.response.data) {
        errorMessage = error.response.data;
      }

      notify(errorMessage);
    }
  };

  return (
    <>
      <h1>Add new entry</h1>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={addDiaryEntry}>
        <label htmlFor="date">date</label>
        <input id="date" {...date} />
        <br />
        <label htmlFor="visibility">visibility</label>
        <input id="visibility" {...visibility} />
        <br />
        <label htmlFor="weather">weather</label>
        <input id="weather" {...weather} />
        <br />
        <label htmlFor="comment">comment</label>
        <input id="comment" {...comment} />
        <br />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewEntry;
