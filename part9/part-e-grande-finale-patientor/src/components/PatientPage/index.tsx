import { useEffect, useState } from "react";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { Patient } from "../../types";

import patientService from "../../services/patients";

interface PatientPageProps {
  id: string;
}

const PatientPage = ({ id }: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient>();

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
    </>
  );
};

export default PatientPage;
