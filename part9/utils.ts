export const argsToNumber = (args: string[], numArgs: number): number[] => {
  if (args.length < numArgs + 2) {
    throw new Error("Not enough arguments");
  }

  if (args.length > numArgs + 2) {
    throw new Error("Too many arguments");
  }

  const splicedArgs: string[] = args.slice(2);

  const parsedArgs = splicedArgs.map((arg: string): number => {
    if (isNaN(Number(arg))) {
      throw new Error("Provided values were not numbers!");
    }

    return Number(arg);
  });

  return parsedArgs;
};
