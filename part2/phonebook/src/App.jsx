import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);
  console.log("render", persons.length, "persons");

  return (
    <>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new number</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setSuccessMessage={setSuccessMessage}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
        setSuccessMessage={setSuccessMessage}
      />
    </>
  );
};

export default App;
