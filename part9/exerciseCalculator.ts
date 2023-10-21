import { argsToNumber } from "./utils";

export interface exerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateRating = (average: number, target: number): [number, string] => {
  let ratingDescription: string = "Just about reached your goal.";
  let rating: number = 2;

  if (average < target) {
    ratingDescription = "Not quite there yet.";
    rating = 1;
  } else if (average > target) {
    ratingDescription = "Exceeded expectations!";
    rating = 3;
  }

  return [rating, ratingDescription];
};

export const calculateExercises = (parameters: number[]): exerciseResults => {
  if (parameters.length < 3) {
    throw new Error("Not enough days to calculate a result!");
  }

  const dailyExerciseHours: number[] = parameters.slice(1);

  const sumOfExerciseHours: number = dailyExerciseHours.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );

  const target: number = parameters[0];

  const periodLength: number = dailyExerciseHours.length;

  const trainingDays: number = dailyExerciseHours.reduce(
    (acc: number, curr: number) => {
      if (curr != 0) {
        return acc + 1;
      }

      return acc;
    },
    0
  );

  const average: number = sumOfExerciseHours / periodLength;

  const success: boolean = average >= target;

  const [rating, ratingDescription]: [number, string] = calculateRating(
    average,
    target
  );

  const results: exerciseResults = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return results;
};

try {
  console.log(
    calculateExercises(argsToNumber(process.argv, process.argv.length - 2))
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
