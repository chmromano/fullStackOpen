import { Diagnosis, Entry } from "../../../types";
import { assertNever } from "../../../utils";

import DiagnosisListItem from "./DiagnosisListItem";
import HealthCheckEntryView from "./HealthCheckEntryView";
import HospitalEntryView from "./HospitalEntryView";
import OccupationalHealthcareEntryView from "./OccupationalHealthcareEntryView";

interface BaseEntryViewProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const BaseEntryView = ({ entry, diagnoses }: BaseEntryViewProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryView entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryView entry={entry} diagnoses={diagnoses} />
      );
    case "HealthCheck":
      return <HealthCheckEntryView entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default BaseEntryView;
