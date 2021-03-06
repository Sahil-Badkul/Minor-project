import Navigation from "./component/Navigation";
import Home from "./component/Home";
import Contact from "./component/Contact";
import Services from "./component/Services";
import Login from "./component/Login";
import Create from "./component/Create";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import NotFound from "./component/NotFound";
import Footer from "./component/Footer";
import ServicesDetails from "./component/ServicesDetails";
import UploadMultipleImages from "./component/UploadMultipleImages";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  window.onscroll = () => {
    if(window.scrollY > 20){
      document.querySelector('.navbar').classList.add('sticky');
    }else{
      document.querySelector('.navbar').classList.remove('sticky');
    }
  }
  return (
    <Router>
      <div className="App">
        <Navigation isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServicesDetails isAuth={isAuth} />} />
          <Route path="/create" element={<Create isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/uploadimages" element={<UploadMultipleImages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        < Footer />
      </div>
    </Router>
  );
}

export default App;
