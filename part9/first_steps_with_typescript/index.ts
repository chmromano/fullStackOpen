import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { looselyPositiveNumber, onlyLooselyPositiveNumbers } from "./utils";
import { calculateExercises, exerciseResults } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_request, response): void => {
  response.send("Hello Full Stack!");
});

app.get("/bmi", (request, response): void => {
  const height: number = Number(request.query.height);
  const weight: number = Number(request.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    response.status(400).json({ error: "malformatted parameters" });
    return;
  }

  response.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.get("/exercises", (request, response): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const dailyExercises: number[] = request.body.daily_exercises as number[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = request.body.target as number;

  if (
    !onlyLooselyPositiveNumbers(dailyExercises) ||
    !looselyPositiveNumber(target)
  ) {
    response.status(400).json({ error: "malformatted parameters" });
    return;
  }

  if (dailyExercises.length < 1) {
    response.status(400).json({ error: "parameters missing" });
    return;
  }

  const result: exerciseResults = calculateExercises(
    [target].concat(dailyExercises)
  );

  response.json(result);
});

const PORT: number = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
