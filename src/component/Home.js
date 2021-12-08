import { Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";
import './home.css';
const Home = () => {
  return (
    <>
      <section id="home">
        <div className="inner-width">
          <div className="content">
            <strong>TrueFriend</strong>
            <h1>Stay with us and get </h1>
            <div className="sm">
              <a href="#" className="fab fa-facebook-f"></a>
              <a href="#" className="fab fa-twitter"></a>
              <a href="#" className="fab fa-instagram"></a>
              <a href="#" className="fab fa-linkedin-in"></a>
              <a href="#" className="fab fa-youtube"></a>
            </div>
            <div className="buttons">
              <a href="#contact">Contact me</a>
              <Link to='/services'>Services</Link>
            </div>
          </div>
        </div>
      </section>
      
      <About />
      <Contact />
      
  <button className="goTop fas fa-arrow-up"></button>
    </>
  );
};

export default Home;
