import personService from "../services/persons";

const PersonForm = (props) => {
  console.log(props);
  const {
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    setSuccessMessage,
  } = props;

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const searchResult = persons.find((person) => person.name === newName);

    if (searchResult === undefined) {
      personService
        .createPerson(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewNumber("");

          setSuccessMessage(`${newPerson.name} was added to the phonebook`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => console.log("promise failed"));
    } else {
      const id = searchResult.id;

      if (
        window.confirm(
          `${newName} is already in the phonebook. Do you want to replace his old phone number with a new one?`
        )
      ) {
        personService
          .updatePerson(id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");

            setSuccessMessage(`${newPerson.name}'s number was updated`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => console.log("promise failed"));
      }
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
