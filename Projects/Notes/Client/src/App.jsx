import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

import AddNotes from "./components/AddNotes";
import ViewNotes from "./components/ViewNotes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Home />}></Route>

        <Route path="/addnotes" element={<AddNotes />}></Route>
        <Route path="/viewnotes" element={<ViewNotes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
