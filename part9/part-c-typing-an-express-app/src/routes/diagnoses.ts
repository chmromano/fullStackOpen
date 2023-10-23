import express from "express";

import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_request, response): void => {
  response.send(diagnosisService.getDiagnoses());
});

export default router;
