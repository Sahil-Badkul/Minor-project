import logo from '../images/logo.jpg'
import { useState } from 'react';
import db from '../database/Config';
import {
  collection,
  addDoc
} from 'firebase/firestore'
const Contact = () => {
  // init contactInfo
  const contactInfoCollectionRef = collection(db, 'contactInfo');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('');

  const handleAddContact = (e) => {
    e.preventDefault();
    const info = {name,email,subject,message};
    console.log(info);
    addDoc(contactInfoCollectionRef, {
      name,
      email,
      subject,
      message
    }).then(() => {
      alert('Message send.')
      console.log('info added');
    });
  }

  return (
    <>
      <section id='AboutContactHeader' className='dark'></section>
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
              We are here to help you to find hostel and mess at the comfort of your location .We pride ourselves on offering a painless user experience and we work tirelessly to achieve this.Things like hostel and mess information , their contact numbers and users reviews are just some of the things that we are facing smiles on faces.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="dark">
        <div className="inner-width">
          <h1 className="section-title">Get in touch</h1>
          <div className="contact-info">
            <div className="item">
              <i className="fas fa-mobile-alt"></i>
              <a href="tel:918305300840">+91 8305300840</a>
            </div>

            <div className="item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:056happylife@gmail.com">Send email</a>
            </div>

            <div className="item">
              <i className="fas fa-map-marker-alt"></i>
              Jabalpur, India
            </div>
          </div>

          <form onSubmit={handleAddContact} className="contact-form">
            <input
              type="text"
              className="nameZone"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="emailZone"
              placeholder="Your Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="text" 
              className="subjectZone" 
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
             className="messageZone" 
             placeholder="Message"
             required
             value={message}
             onChange={(e) => setMessage(e.target.value)}
             ></textarea>
            <input type="submit" value="Send Message" className="btn" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
