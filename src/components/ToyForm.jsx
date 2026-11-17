// ToyForm
// Child of: App
// A CONTROLLED form: the input values live in state, so React always knows
// what is typed. On submit it POSTs the new toy to the server.
// Props:
//   onAddToy (function) - tells App to add the new toy to its state
//                         (inverse data flow: child -> parent)

import React, { useState } from "react";

const API_URL = "http://localhost:3001/toys";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // POST: when the form is submitted, create the toy on the server.
  // New toys always start with 0 likes.
  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    const newToy = { name, image, likes: 0 };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((createdToy) => {
        onAddToy(createdToy); // the server's copy includes the new id
        setName(""); // clear the form
        setImage("");
      })
      .catch((error) => console.error("Could not add toy:", error));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
