// import React, { useState } from "react";
// import Table from "./Table";
// import Form from "./Form";

// function MyApp() {
//   const [characters, setCharacters] = useState([]);

//   function removeOneCharacter(index) {
//     const updated = characters.filter((character, i) => i !== index);
//     setCharacters(updated);
//   }

//   function handleSubmit(newPerson) {
//     setCharacters([...characters, newPerson]); 
//   }

//   return (
//     <div className="container">
//       <Table characterData={characters} removeCharacter={removeOneCharacter} />
//       <Form handleSubmit={handleSubmit} />
//     </div>
//   );
// }

// export default MyApp;




import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // Function to fetch users from backend
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  // Use effect to fetch users on component mount
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to post a new user to backend
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
    return promise;
  }

  // Function to add a new user to the list
  function updateList(person) {
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => i !== index);
    setCharacters(updated);
  }

  function handleSubmit(newPerson) {
    updateList(newPerson);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default MyApp;
