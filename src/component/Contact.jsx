import './contact.css';
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="text" 
              className="subjectZone" 
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
             className="messageZone" 
             placeholder="Message"
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
