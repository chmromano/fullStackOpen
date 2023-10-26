import { Diagnosis } from "../../types";

interface DiagnosisListItemProps {
  code: string;
  diagnoses: Diagnosis[];
}

const DiagnosisListItem = ({ code, diagnoses }: DiagnosisListItemProps) => {
  const diagnosis = diagnoses.find((d) => d.code === code);

  return !diagnosis ? null : (
    <li>
      {code} {diagnosis.name}
    </li>
  );
};

export default DiagnosisListItem;
