const Name = (props) => {
  console.log(props);
  const { text } = props;
  return (
    <>
      <h2>{text}</h2>
    </>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  console.log(props);
  const { parts } = props;
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = (props) => {
  console.log(props);
  const { parts } = props;

  const sumWithReduce = parts.reduce(
    (sum, next) => sum + next.exercises,
    0 // The initial value of sum for the reduce function
  );

  return (
    <>
      <b>total of {sumWithReduce} exercises</b>
    </>
  );
};

const Course = (props) => {
  console.log(props);
  const { course } = props;
  return (
    <>
      <Name text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
