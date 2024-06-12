import { useState } from "react";
import { produce } from "immer";

function App() {
  const [game, setGame] = useState({
    name: "Pepperoni",
    toppings: ['Cheese']
  });

  let handleClick = () => {
    setGame(
      produce((draft) => {
        draft.toppings.push("Pepperoni")
      })
    );
  };

  return (
    <>
      {game.toppings.map((topping=> <li key={topping}>{topping}</li>))}
      <button onClick={handleClick}>click me</button>
    </>
  );
}

export default App;
