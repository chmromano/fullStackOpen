import { NonSensitiveDiaryEntry } from "../types";

import DiaryEntryView from "./DiaryEntryView";

const DiaryEntries = ({ entries }: { entries: NonSensitiveDiaryEntry[] }) => {
  return (
    <>
      <h1>Diary entries</h1>
      {entries.map((e: NonSensitiveDiaryEntry) => (
        <DiaryEntryView key={e.id} entry={e} />
      ))}
    </>
  );
};

export default DiaryEntries;
