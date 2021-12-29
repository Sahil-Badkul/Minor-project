import { Link } from "react-router-dom";
import Contact from "./Contact";

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
              <Link to="/services">Services</Link>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <button className="goTop fas fa-arrow-up"></button>
      <footer>
        <div class="inner-width">
          <div class="copyright">
            &copy; 2021 | Created & Designed By TrueFriend Team
          </div>
          <div class="sm">
            <a href="#" class="fab fa-facebook-f"></a>
            <a href="#" class="fab fa-twitter"></a>
            <a href="#" class="fab fa-instagram"></a>
            <a href="#" class="fab fa-linkedin-in"></a>
            <a href="#" class="fab fa-youtube"></a>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Home;
