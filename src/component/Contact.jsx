const Contact = () => {
  return (
    <>
      <section id="contact" className="dark">
        <div className="inner-width">
          <h1 className="section-title">Get in touch</h1>
          <div className="contact-info">
            <div className="item">
              <i className="fas fa-mobile-alt"></i>
              +91 8305300840
            </div>

            <div className="item">
              <i className="fas fa-envelope"></i>
              truefriend@gmil.com
            </div>

            <div className="item">
              <i className="fas fa-map-marker-alt"></i>
              Jabalpur, India
            </div>
          </div>

          <form action="#" className="contact-form">
            <input
              type="text"
              className="nameZone"
              placeholder="Your Full Name"
            />
            <input
              type="email"
              className="emailZone"
              placeholder="Your Email"
            />
            <input type="text" className="subjectZone" placeholder="Subject" />
            <textarea className="messageZone" placeholder="Message"></textarea>
            <input type="submit" value="Send Message" className="btn" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
