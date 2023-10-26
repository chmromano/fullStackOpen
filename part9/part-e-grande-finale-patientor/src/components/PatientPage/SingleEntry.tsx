import { Entry } from "../../types";

interface SingleEntryProps {
  entry: Entry;
}

const SingleEntry = ({ entry }: SingleEntryProps) => (
  <li>
    <p>
      {entry.date} {entry.description}
    </p>
    <ul>
      {!entry.diagnosisCodes
        ? null
        : entry.diagnosisCodes.map((code: string) => (
            <li key={code}>{code}</li>
          ))}
    </ul>
  </li>
);

export default SingleEntry;
