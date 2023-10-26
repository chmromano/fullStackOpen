import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import "./Entry.css";

import DiagnosisListItem from "./DiagnosisListItem";
import { Diagnosis, HospitalEntry } from "../../../types";

interface HospitalEntryViewProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryView = ({ entry, diagnoses }: HospitalEntryViewProps) => (
  <div className="Entry">
    <p>
      {entry.date} <LocalHospitalIcon />
      <br />
      <i>{entry.description}</i>
    </p>
    Diagnosed by {entry.specialist}
    {!entry.discharge ? null : (
      <>
        <br />
        Discharge: {entry.discharge.date}
        <br />
        Reason: {entry.discharge.criteria}
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

export default HospitalEntryView;
