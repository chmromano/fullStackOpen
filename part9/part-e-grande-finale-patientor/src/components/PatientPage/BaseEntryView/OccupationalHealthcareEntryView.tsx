import WorkIcon from "@mui/icons-material/Work";

import "./Entry.css";

import DiagnosisListItem from "./DiagnosisListItem";
import { Diagnosis, OccupationalHealthcareEntry } from "../../../types";

interface OccupationalHealthcareEntryViewProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryView = ({
  entry,
  diagnoses,
}: OccupationalHealthcareEntryViewProps) => (
  <div className="Entry">
    <p>
      {entry.date} <WorkIcon /> {entry.employerName}
      <br />
      <i>{entry.description}</i>
    </p>
    Diagnosed by {entry.specialist}
    {!entry.sickLeave ? null : (
      <>
        <br />
        Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
      </>
    )}
    {!entry.diagnosisCodes ? null : (
      <ul>
        {entry.diagnosisCodes.map((code: string) => (
          <DiagnosisListItem key={code} code={code} diagnoses={diagnoses} />
        ))}
      </ul>
    )}
  </div>
);

export default OccupationalHealthcareEntryView;
