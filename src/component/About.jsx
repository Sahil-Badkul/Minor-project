import logo from '../images/logo.jpg'
import './about.css';
const About = () => {
  return (
    <>
      <section id="about">
        <div className="inner-width">
          <h1 className="section-title">About</h1>
          <div className="about-content">
            <img src={logo} alt="" className="about-pic" />
            <div className="about-text">
              <h2>Hi! We'r TrueFriend</h2>
              <h3>
                <span>Hostels</span>
                <span>Food</span>
                <span>Many more</span>
              </h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
                fuga eaque, culpa cupiditate animi laborum natus! Similique odio
                sit facilis dolorum dicta velit provident sequi iusto, est
                pariatur quisquam corrupti animi necessitatibus aliquid deserunt
                reprehenderit voluptatibus? Exercitationem deserunt fugit dicta
                nesciunt velit quae tempora eius praesentium odio est,
                voluptatem vero incidunt omnis ad iure, soluta maiores nostrum
                inventore alias culpa. Nihil suscipit possimus est harum
                accusamus impedit libero deleniti repellat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
