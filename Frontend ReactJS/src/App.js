import { useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import ContactList from "./components/ContactList";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState(null);
  return (
    <div className="App">
      {loggedIn ? (
        <ContactList id={id} setLoggedIn={setLoggedIn}/>
      ) : (
        <Login setLoggedIn={setLoggedIn} setId={setId} />
      )}
    </div>
  );
}

export default App;
