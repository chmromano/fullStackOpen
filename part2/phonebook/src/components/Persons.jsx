import React from "react";

import personService from "../services/persons";

const Person = (props) => {
  console.log(props);
  const { person, persons, setPersons, setSuccessMessage, setErrorMessage } =
    props;

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Do you really want to delete ${person.name} from the phonebook?`,
      )
    ) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));

          setSuccessMessage(`${person.name} was deleted from the phonebook`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log("Promise failed:", error);

          setErrorMessage(
            `Information of ${person.name} has already been removed from the server`,
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);

          setPersons(persons.filter((person) => person.id !== id));
        });
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
  const { persons, setPersons, filter, setSuccessMessage, setErrorMessage } =
    props;

  const phonebook = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      {phonebook.map((person) => (
        <Person
          key={person.id}
          person={person}
          persons={persons}
          setPersons={setPersons}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </>
  );
};

export default Persons;
