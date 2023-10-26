import { Diagnosis, Entry } from "../../types";

import DiagnosisListItem from "./DiagnosisListItem";

interface SingleEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const SingleEntry = ({ entry, diagnoses }: SingleEntryProps) => (
  <li>
    <p>
      {entry.date} {entry.description}
    </p>
    <ul>
      {!entry.diagnosisCodes
        ? null
        : entry.diagnosisCodes.map((code: string) => (
            <DiagnosisListItem key={code} code={code} diagnoses={diagnoses} />
          ))}
    </ul>
  </li>
);

export default SingleEntry;
