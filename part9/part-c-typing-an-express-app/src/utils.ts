import {
  Diagnosis,
  Discharge,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing health check rating: " + healthCheckRating
    );
  }

  return healthCheckRating;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }

  return employerName;
};

const isSickLeave = (param: unknown): param is SickLeave => {
  return (
    param !== null &&
    typeof param === "object" &&
    "startDate" in param &&
    "endDate" in param
  );
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !isSickLeave(sickLeave) ||
    typeof sickLeave !== "object" ||
    sickLeave === null ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave) ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error(
      "Incorrect or missing sick leave: " + JSON.stringify(sickLeave)
    );
  }

  return sickLeave;
};

const isDischarge = (param: unknown): param is Discharge => {
  return (
    param !== null &&
    typeof param === "object" &&
    "date" in param &&
    "criteria" in param
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !isDischarge(discharge) ||
    typeof discharge !== "object" ||
    discharge === null ||
    !("criteria" in discharge) ||
    !("date" in discharge) ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria) ||
    discharge.criteria.trim().length === 0
  ) {
    throw new Error(
      "Incorrect or missing discharge: " + JSON.stringify(discharge)
    );
  }

  return discharge;
};

const toNewHealthCheckEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "healthCheckRating" in object
  ) {
    const newHealthCheckEntry: NewEntry = {
      type: "HealthCheck",
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };

    if ("diagnosisCodes" in object) {
      newHealthCheckEntry.diagnosisCodes = parseDiagnosisCodes(object);
    }

    return newHealthCheckEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const toNewOccupationalHealthcareEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "employerName" in object
  ) {
    const newOccupationalHealthcareEntry: NewEntry = {
      type: "OccupationalHealthcare",
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      employerName: parseEmployerName(object.employerName),
    };

    if ("sickLeave" in object) {
      newOccupationalHealthcareEntry.sickLeave = parseSickLeave(
        object.sickLeave
      );
    }

    if ("diagnosisCodes" in object) {
      newOccupationalHealthcareEntry.diagnosisCodes =
        parseDiagnosisCodes(object);
    }

    return newOccupationalHealthcareEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const toNewHospitalEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("description" in object && "date" in object && "specialist" in object) {
    const newHospitalEntry: NewEntry = {
      type: "Hospital",
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };

    if ("discharge" in object) {
      newHospitalEntry.discharge = parseDischarge(object.discharge);
    }

    if ("diagnosisCodes" in object) {
      newHospitalEntry.diagnosisCodes = parseDiagnosisCodes(object);
    }

    return newHospitalEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("type" in object) {
    switch (object.type) {
      case "HealthCheck":
        return toNewHealthCheckEntry(object);
      case "Hospital":
        return toNewHospitalEntry(object);
      case "OccupationalHealthcare":
        return toNewOccupationalHealthcareEntry(object);
      default:
        throw new Error("Incorrect data: invalid type");
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};
