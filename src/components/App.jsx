// App
// Root component. It OWNS the list of toys (the state) because several
// children need to read or change it:
//   ToyForm      -> adds a toy
//   ToyContainer -> shows toys, and its ToyCards like / delete them
//
// Data flow:  App (state) --props--> children --callbacks--> App (setToys)

import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// Base URL of the json-server backend (run with `npm run server`)
const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET: when the page first loads, fetch all toys and store them in state.
  // The empty [] means this effect runs only once, on the first render.
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((toysFromServer) => setToys(toysFromServer))
      .catch((error) => console.error("Could not load toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Called by ToyForm after the server created the toy (POST).
  // Adds the new toy to the END of the array without mutating state.
  function handleAddToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  // Called by ToyCard after the server deleted the toy (DELETE).
  // Keeps every toy EXCEPT the one with the deleted id.
  function handleDeleteToy(deletedId) {
    setToys((toys) => toys.filter((toy) => toy.id !== deletedId));
  }

  // Called by ToyCard after the server updated the toy (PATCH).
  // map() swaps in the updated toy but keeps all toys in their original
  // order, so the card does not jump around the page.
  function handleUpdateToy(updatedToy) {
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;
