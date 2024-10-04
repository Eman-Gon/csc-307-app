import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // Function to remove a character by index
  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => i !== index);
    setCharacters(updated);
  }

  // Function to handle the submission of a new character
  function handleSubmit(newPerson) {
    setCharacters([...characters, newPerson]); // Add new character to the state
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default MyApp;
