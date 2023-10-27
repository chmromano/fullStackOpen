import { v4 as uuidv4 } from "uuid";

import patients from "../../data/patients";

import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuidv4();

  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  const id: string = uuidv4();

  const newEntry = {
    id,
    ...entry,
  };

  patients.forEach((p) => {
    if (p.id === patient.id) {
      p.entries.push(newEntry);
    }
  });

  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p: Patient) => p.id === id);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addEntry,
  findById,
};
