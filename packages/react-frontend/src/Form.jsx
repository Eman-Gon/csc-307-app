// src/Form.jsx
import React, { useState } from "react";

function Form({ handleSubmit }) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  // Function to handle input changes and update form state
  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  }

  // Function to handle form submission
  function onSubmit(event) {
    event.preventDefault(); // Prevent page reload on form submission
    if (person.name && person.job) {
      handleSubmit(person); // Send the new person data to MyApp
      setPerson({ name: "", job: "" }); // Clear the form after submission
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
