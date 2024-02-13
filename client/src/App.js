import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Users from "./components/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home currentUser={user} setUser={setUser} />}
          />
          <Route
            path="/users"
            element={<Users currentUser={user} setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
