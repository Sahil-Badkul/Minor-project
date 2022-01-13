import { useParams, useNavigate } from "react-router-dom";
import { doc, deleteDoc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../database/Config";
import { useState, useEffect } from "react";

const ServicesDetails = ({ isAuth }) => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  // getting single doc
  useEffect(() => {
    const docRef = doc(db, "services", id);
    onSnapshot(docRef, (doc) => {
      try {
        const temp = {};
        Object.assign(temp, doc.data());
        setInfo(temp);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
      }
    });
  }, [id]);
  //deleting services
  const deleteInfo = async (id) => {
    const docRef = doc(db, "services", id);
    if (window.confirm("You want to delete?")) {
      await deleteDoc(docRef)
        .then(() => {
          navigate("/");
        })
        .catch((e) => {
          setError(e.message);
        });
    }
  };

  return (
    <section className="dark">
      <div className="section-title">Services details</div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {info && (
        <>
          <article>
            <h2>Image:</h2>
            <img src={info.image} alt="img" style={{width:300,height:300,borderRadius:8}}/>
            <h2>Name:</h2>
            <p>{info.name}</p>
            <h2>Location:</h2>
            <p><i className="fas fa-map-marker-alt"></i>{info.location}</p>
            <h2>Price:</h2>
            <p>&#8377;{info.price}</p>
            <h3>Description:</h3>
            <p>{info.description}</p>
          </article>
        </>
      )}

      {isAuth && (
        <>
          <button
            onClick={() => {
              deleteInfo(id);
            }}
          >
            delete
          </button>
        </>
      )}
    </section>
  );
};

export default ServicesDetails;
