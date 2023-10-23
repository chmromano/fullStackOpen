import { useEffect, useState } from "react";

import DiaryEntries from "./components/DiaryEntries";
import NewEntry from "./components/NewEntry";

import { DiaryEntry } from "./types";
import { getAllDiaryEntries } from "./services/diaryService";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const fetchDiaryEntries = async () => {
    const fetchedDiaries = await getAllDiaryEntries();
    setDiaryEntries(fetchedDiaries);
  };

  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  const handleNewDiaryEntry = (entry: DiaryEntry) => {
    setDiaryEntries(diaryEntries.concat(entry));
  };

  return (
    <>
      <NewEntry newDiaryHandler={handleNewDiaryEntry} />
      <DiaryEntries entries={diaryEntries} />
    </>
  );
};

export default App;
