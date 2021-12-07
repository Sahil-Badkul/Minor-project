import { useState, useEffect } from "react";
import db from "../database/Config";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import Card from "./Card";
import "../App.css";

function Services() {

  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("mess");
  //form component
  const [name, setName] = useState("");
  const [category, setCategory] = useState("hostel");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // init services
  const servicesCollectionRef = collection(db, "Services");

  //queries
  const q = query(servicesCollectionRef, where("category", "==", filter ));
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
  }, []);

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
    });
  };

  //deleting services
  const deleteInfo = (id) => {
    const docRef = doc(db, "Services", id);
    deleteDoc(docRef).then(() => {
      console.log("Deleted");
    });
  };

  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  return (
    <>
      <Card menuData={services} deleteInfo={deleteInfo} />
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
          <button type="button" className="btn cancel" onClick={ () => {closeForm()}}>
            Close
          </button>
        </form>
      </div>

      <button className="open-button" onClick={() => {openForm()}}>
        Open Form
      </button>
    </>
  );
}
export default Services;
