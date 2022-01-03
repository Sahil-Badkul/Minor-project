import { useState, useEffect } from "react";
import db from "../database/Config";
import {
  collection,
  onSnapshot,
  query,
  where,
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


  return (
    <>
      <section className="dark">
        <div className="inner-width" >
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
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default Services;
