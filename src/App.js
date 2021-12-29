import Navigation from "./component/Navigation";
import Home from "./component/Home";
import Contact from "./component/Contact";
import Services from "./component/Services";
import Login from "./component/Login";
import Create from "./component/Create";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
