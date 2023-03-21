const PersonForm = (props) => {
  console.log(props);
  const { persons, setPersons, newName, setNewName, newNumber, setNewNumber } =
    props;

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (nameAlreadyInPhonebook(newName)) {
      alert(`${newName} is already in the phonebook`);
    } else if (numberAlreadyInPhonebook(newNumber)) {
      alert(`${newNumber} is already in the phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const nameAlreadyInPhonebook = (newName) => {
    const searchResult = persons.find((person) => person.name === newName);
    return !(searchResult === undefined);
  };

  const numberAlreadyInPhonebook = (newNumber) => {
    const searchResult = persons.find((person) => person.number === newNumber);
    return !(searchResult === undefined);
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
