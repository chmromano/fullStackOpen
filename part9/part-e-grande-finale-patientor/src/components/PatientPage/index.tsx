import { useEffect, useState } from "react";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { EntryFormValues, Patient } from "../../types";

import patientService from "../../services/patients";
import EntriesList from "./EntriesList";
import { Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

interface PatientPageProps {
  id: string;
}

const PatientPage = ({ id }: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await patientService.getOne(id);
      setPatient(fetchedPatient);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <>Loading...</>;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntry(patient.id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const getGenderIcon = (patient: Patient) => {
    switch (String(patient.gender)) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <TransgenderIcon />;
      default:
        return <QuestionMarkIcon />;
    }
  };

  const genderIcon = getGenderIcon(patient);

  return (
    <>
      <h1>
        {patient.name} {genderIcon}
      </h1>
      <p>
        id: {patient.id}
        <br />
        ssn: {patient.ssn}
        <br />
        date of birth: {patient.dateOfBirth}
        <br />
        occupation: {patient.occupation}
      </p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <EntriesList entries={patient.entries} />
    </>
  );
};

export default PatientPage;
