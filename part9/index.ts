import express from "express";

import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack!");
});

app.get("/bmi", (request, response) => {
  const height: number = Number(request.query.height);
  const weight: number = Number(request.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    response.json({ error: "malformatted query parameters" });
  }

  const bmi: string = calculateBmi(height, weight);

  response.json({ weight, height, bmi });
});

const PORT: number = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
