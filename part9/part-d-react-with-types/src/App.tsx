import Total from "./components/Total";
import Header from "./components/Header";
import Content from "./components/Content";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={totalExercises} />
    </>
  );
};

export default App;
