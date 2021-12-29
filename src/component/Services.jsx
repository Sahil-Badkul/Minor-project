import { useState, useEffect } from "react";
import db from "../database/Config";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import Card from "./Card";
import "./services.css";


function Services() {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("hostel");  

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
  }, [filter]);



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
    console.log(docRef);
    getDoc(docRef).then((doc) => {
      console.log(doc.data(), doc.name);
      alert(JSON.stringify(doc.data().name));
    });
  };

  return (
    <>
      <section className="dark">
        <div className="inner-width" style={{ marginTop: 30 }}>
          <h1 className="section-title"> Our Services</h1>
          <div>
            <button onClick={() => setFilter("hostel")} className="serviceNav">
              Hostel
            </button>
            <button onClick={() => setFilter("mess")} className="serviceNav">
              Mess
            </button>
          </div>

          <div className="container">
            <Card
              menuData={services}
              deleteInfo={deleteInfo}
              goThere={goThere}
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default Services;
