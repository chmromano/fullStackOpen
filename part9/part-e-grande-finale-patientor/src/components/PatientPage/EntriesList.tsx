import { useEffect, useState } from "react";
import { Entry, Diagnosis } from "../../types";

import diagnosisService from "../../services/diagnoses";

import SingleEntry from "./SingleEntry";

interface EntriesListProps {
  entries: Entry[];
}

const EntriesList = ({ entries }: EntriesListProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  return (
    <>
      <h2>Entries</h2>
      <ul>
        {entries.map((e: Entry) => (
          <SingleEntry key={e.id} entry={e} diagnoses={diagnoses} />
        ))}
      </ul>
    </>
  );
};

export default EntriesList;
