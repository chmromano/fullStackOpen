import express from "express";

import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_request, response): void => {
  response.send(patientService.getNonSensitivePatients());
});

router.post("/", (request, response): void => {
  try {
    const newPatient = toNewPatient(request.body);
    const addedPatient = patientService.addPatient(newPatient);
    response.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    response.status(400).send(errorMessage);
  }
});
export default router;