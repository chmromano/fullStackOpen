const Person = (props) => {
  const { person } = props;
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Persons = (props) => {
  console.log(props);
  const { phonebook } = props;

  return (
    <>
      {phonebook.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </>
  );
};

export default Persons;
