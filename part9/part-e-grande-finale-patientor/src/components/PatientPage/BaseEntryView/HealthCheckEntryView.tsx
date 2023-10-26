import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./Entry.css";

import DiagnosisListItem from "./DiagnosisListItem";
import { Diagnosis, HealthCheckEntry } from "../../../types";
import HealthRatingBar from "../../HealthRatingBar";

interface HealthCheckEntryViewProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryView = ({
  entry,
  diagnoses,
}: HealthCheckEntryViewProps) => (
  <div className="Entry">
    <p>
      {entry.date} <CheckCircleIcon />
      <br />
      <i>{entry.description}</i>
    </p>
    <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
    <br />
    Diagnosed by {entry.specialist}
    {!entry.diagnosisCodes ? null : (
      <ul>
        {entry.diagnosisCodes.map((code: string) => (
          <DiagnosisListItem key={code} code={code} diagnoses={diagnoses} />
        ))}
      </ul>
    )}
  </div>
);

export default HealthCheckEntryView;
