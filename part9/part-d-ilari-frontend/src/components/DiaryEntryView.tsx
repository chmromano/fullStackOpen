import { NonSensitiveDiaryEntry } from "../types";

const DiaryEntryView = ({ entry }: { entry: NonSensitiveDiaryEntry }) => {
  return (
    <>
      <h2>{entry.date}</h2>
      <p>
        visibility: {entry.visibility}
        <br />
        weather: {entry.weather}
      </p>
    </>
  );
};

export default DiaryEntryView;
