import express from "express";
import cors from "cors";

import diagnosisRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_request, response) => {
  console.log("someone pinged here");
  response.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

const PORT: number = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
