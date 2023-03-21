const Header = (props) => {
  console.log(props);
  const { text } = props;
  return (
    <>
      <h1>{text}</h1>
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

// const Total = (props) => {
//   console.log(props);
//   return (
//     <>
//       <p>
//         Number of exercises{" "}
//         {props.course.parts[0].exercises +
//           props.course.parts[1].exercises +
//           props.course.parts[2].exercises}
//       </p>
//     </>
//   );
// };

const Course = (props) => {
  console.log(props);
  const { course } = props;
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
