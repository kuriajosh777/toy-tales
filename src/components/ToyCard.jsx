// ToyCard
// Child of: ToyContainer
// Shows one toy and handles the two actions that belong to a single toy:
//   Like   -> PATCH /toys/:id   (send the new likes number)
//   Donate -> DELETE /toys/:id  (remove the toy)
// Props:
//   toy         (object)   - { id, name, image, likes }
//   onDeleteToy (function) - tells App to remove the toy from state
//   onUpdateToy (function) - tells App to replace the toy in state

import React from "react";

const API_URL = "http://localhost:3001/toys";

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  const { id, name, image, likes } = toy;

  // PATCH: when Like is clicked, send likes + 1 to the server, then update
  // state with the toy the server sends back.
  function handleLikeClick() {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((response) => response.json())
      .then((updatedToy) => onUpdateToy(updatedToy))
      .catch((error) => console.error("Could not like toy:", error));
  }

  // DELETE: when Donate is clicked, delete the toy on the server.
  // Only if that worked do we remove it from state (and so from the page).
  function handleDeleteClick() {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) onDeleteToy(id);
      })
      .catch((error) => console.error("Could not donate toy:", error));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
