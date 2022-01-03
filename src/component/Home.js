import { Link } from "react-router-dom";
import Contact from "./Contact";

const Home = () => {
  return (
    <>
      <section id="home">
        <div className="inner-width">
          <div className="content">
            <div >
            <strong>TrueFriend</strong>
            <h1>Stay with us and get </h1>
            <div className="sm">
              <a href="https://www.facebook.com/sahil.badkul.3" target={"_blank"} className="fab fa-facebook-f"></a>
              <a href="https://www.instagram.com/sahil.badkul.3/" target={"_blank"} className="fab fa-instagram"></a>
              <a href="https://www.linkedin.com/in/sahil-jain-61bb3b208/" target={"_blank"} className="fab fa-linkedin-in"></a>
              <a href="https://www.youtube.com/channel/UCos9ymVz-0N1L-n4En3nesw" target={"_blank"} className="fab fa-youtube"></a>
            </div>
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
        </>
  );
};

export default Home;
