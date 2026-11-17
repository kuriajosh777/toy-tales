// ToyContainer
// Child of: App    Parent of: ToyCard
// Props:
//   toys        (array)    - all toys to display
//   onDeleteToy (function) - passed down to each ToyCard
//   onUpdateToy (function) - passed down to each ToyCard

import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDeleteToy, onUpdateToy }) {
  return (
    <div id="toy-collection">
      {/* One ToyCard per toy. key must be unique, so we use the toy's id. */}
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDeleteToy={onDeleteToy}
          onUpdateToy={onUpdateToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
