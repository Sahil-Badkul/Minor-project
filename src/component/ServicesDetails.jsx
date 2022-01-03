import { useParams, useNavigate } from "react-router-dom";
import { doc, deleteDoc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../database/Config";
import { useState, useEffect } from "react";

const ServicesDetails = ({ isAuth }) => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [details, setDetails] = useState();
  const navigate = useNavigate();

  // getting single doc
  useEffect(() => {
    const docRef = doc(db, "Serivces", id);
    getDoc(docRef)
      .then((doc) => {
        const temp = {};
        Object.assign(temp, doc.data());
        setDetails(temp);
        setIsPending(false);
        console.log(temp)
        console.log(doc.data())
        console.log("sahil");
      })
      .catch((e) => {
        setError(e.message);
        navigate("/");
        window.location.reload();
      });
  }, [id]);
  //deleting services
  const deleteInfo = async (id) => {
    const docRef = doc(db, "Services", id);
    await deleteDoc(docRef)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <section className="dark">
      <div className="section-title">Services details</div>
      {id}
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {/* {details && (
        <article>
          <img src={details.image} alt="" />
          <h2>{details.name}</h2>
          <p>{details.description}</p>
        </article>
      )} */}
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
