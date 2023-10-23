import { Fragment } from "react";

interface RadioGroupProps {
  name: string;
  values: string[];
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = ({ name, values, handler }: RadioGroupProps) => {
  return (
    <fieldset>
      <legend>{name}</legend>
      {values.map((v) => (
        <Fragment key={v}>
          <input type="radio" name={name} id={v} value={v} onChange={handler} />
          <label htmlFor={v}>{v}</label>
        </Fragment>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
