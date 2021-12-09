import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from "../database/Config";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import Card from "./Card";
import "./services.css";
import "./form.css";
import LogIn from "./LogIn";

function Services() {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("hostel");
  const navigate = useNavigate();

  //form component
  const [name, setName] = useState("");
  const [category, setCategory] = useState("hostel");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  // init services
  const servicesCollectionRef = collection(db, "Services");

  //queries
  const q = query(servicesCollectionRef, where("category", "==", filter));

  //getting services
  useEffect(() => {
    const getServices = async () => {
      onSnapshot(q, (snapshot) => {
        let service = [];
        snapshot.docs.forEach((doc) => {
          service.push({ ...doc.data(), id: doc.id });
        });
        setServices(service);
      });
    };
    getServices();
    console.log(filter);
  }, [filter]);

  //adding service
  const handleSubmit = (e) => {
    e.preventDefault();
    const info = { name, image, category, description };
    console.log(info);
    addDoc(servicesCollectionRef, {
      name,
      description,
      image,
      category,
    }).then(() => {
      console.log("Info added");
      window.location.reload();
    });
    navigate("/services");
  };

  //deleting services
  const deleteInfo = (id) => {
    const docRef = doc(db, "Services", id);
    deleteDoc(docRef).then(() => {
      console.log("Deleted");
    });
  };

  //getting a single document
  const goThere = (id) => {
    const docRef = doc(db, "Services", id);
    getDoc(docRef).then((doc) => {
      console.log(doc.data(), doc.id);
      alert(doc.data());
    });
  };

  // form function
  function openForm(value) {
    if (value === "form") {
      document.getElementById("myForm").style.display = "block";
    } 
  }

  // close function
  const closeForm = (value) => {
    if (value === "form") {
      document.getElementById("myForm").style.display = "none";
    }
  };

  return (
    <>
      <section className="dark">
        <div className="container">
          <Card menuData={services} deleteInfo={deleteInfo} goThere={goThere} />
        </div>
        <div>
          <button onClick={() => setFilter("hostel")}>Hostel</button>
          <button onClick={() => setFilter("mess")}>Mess</button>
        </div>

        <div className="form-popup" id="myForm">
          <form onSubmit={handleSubmit} class="form-container">
            <h1>Add service</h1>
            <label>Enter title/name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Upload image:</label>
            <input
              type="file"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <label>Description:</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="hostel">Hostel</option>
              <option value="mess">Mess</option>
            </select>
            <button type="submit" className="btn">
              Add
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={() => {
                closeForm("form");
              }}
            >
              Close
            </button>
          </form>
        </div>

        <button
          className="open-button"
          onClick={() => {
            openForm("form");
          }}
        >
          Open Form
        </button>
      </section>
      <LogIn />
    </>
  );
}
export default Services;
