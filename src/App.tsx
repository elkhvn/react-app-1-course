import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

const connect = () => console.log("connecting");

const disconnect = () => console.log("disconnecting");

function App() {
  useEffect(()=>{
    connect();

    return () => disconnect();
  })

  return (
    <div>
    </div>
  );
}

export default App;
