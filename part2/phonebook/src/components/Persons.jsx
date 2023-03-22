import personService from "../services/persons";

const Person = (props) => {
  console.log(props);
  const { person, persons, setPersons } = props;

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Do you really want to delete ${person.name} from the phonebook?`
      )
    ) {
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => console.log("Promise failed"));
    }
  };

  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </div>
  );
};

const Persons = (props) => {
  console.log(props);
  const { persons, setPersons, filter } = props;

  const phonebook = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {phonebook.map((person) => (
        <Person
          key={person.id}
          person={person}
          persons={persons}
          setPersons={setPersons}
        />
      ))}
    </>
  );
};

export default Persons;
