import { useState } from "react";
import { produce } from "immer";

function App() {
  const [game, setGame] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  let handleClick = () => {
    setGame(
      produce((draft) => {
        let item = draft.items.find((item) => item.id === 1);
        item.quantity--;
      })
    );
  };

  return (
    <>
      {game.items.map((item) => (
        <li key={item.id}>
          {item.title}-{item.quantity}
        </li>
      ))}
      <button onClick={handleClick}>click me</button>
    </>
  );
}

export default App;
