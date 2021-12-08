import Navigation from "./component/Navigation";
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact'
import Services from "./component/Services";
import Fotter from "./component/Fotter";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
        <Route path='Minor-project/' element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/services' element={ <Services /> } />
        </Routes>
        <Fotter />
      </Router>
    </div>
  );
}

export default App;
