import { useState } from "react";

import useField from "../hooks/useField";
import { createDiaryEntry } from "../services/diaryService";
import { DiaryEntry, Visibility, Weather } from "../types";

import Notify from "./Notify";
import axios from "axios";
import RadioGroup from "./RadioGroup";

interface NewEntryProps {
  newDiaryHandler: (entry: DiaryEntry) => void;
}

const NewEntry = ({ newDiaryHandler }: NewEntryProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { reset: resetDate, ...date } = useField("date");
  const { reset: resetComment, ...comment } = useField("text");
  const [weather, setWeather] = useState<Weather>();
  const [visibility, setVisibility] = useState<Visibility>();

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
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment: comment.value,
      });

      newDiaryHandler(newDiaryEntry);

      resetDate();
      resetComment();
    } catch (error: unknown) {
      let errorMessage = "Something bad happened.";

      if (axios.isAxiosError(error) && error.response && error.response.data) {
        errorMessage = error.response.data;
      }

      notify(errorMessage);
    }
  };

  const handleWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };

  const handleVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
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
        <RadioGroup
          name={"visibility"}
          values={["great", "good", "ok", "poor"]}
          handler={handleVisibility}
        />
        <br />
        <RadioGroup
          name={"weather"}
          values={["sunny", "rainy", "cloudy", "stormy", "windy"]}
          handler={handleWeather}
        />
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
