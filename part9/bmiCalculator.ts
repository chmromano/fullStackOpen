import { argsToNumber } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0) {
    throw new Error("Height must be larger than 0!");
  }

  if (weight <= 0) {
    throw new Error("Weight must be larger than 0!");
  }

  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else if (bmi >= 40) {
    return "Obese (Class III)";
  }
};

try {
  const parsedArgs: number[] = argsToNumber(process.argv, 2);
  const height: number = parsedArgs[0];
  const weight: number = parsedArgs[1];

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
