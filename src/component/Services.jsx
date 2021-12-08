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
import { auth } from "../database/Config";
import {
createUserWithEmailAndPassword,
} from 'firebase/auth'
import Card from "./Card";
import "./services.css";
import "./signin.css";
import "./form.css";

function Services() {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("hostel");
  const navigate = useNavigate();

  //form component
  const [name, setName] = useState("");
  const [category, setCategory] = useState("hostel");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  //signin component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  //signin function
  const handleSignIn = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password)
      .then(cred => {
        console.log("user created: ", cred.user)
        window.location.reload();
      })
      .catch(err => {
        alert(err.message);
      })
  }
  var modal = document.getElementById("signin");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // form function
  function openForm(value) {
    if (value === "form") {
      document.getElementById("myForm").style.display = "block";
    } else if (value === "signin") {
      document.getElementById("signin").style.display = "block";
    }
  }

  // close function
  const closeForm = (value) => {
    if (value === "form") {
      document.getElementById("myForm").style.display = "none";
    } else if (value === "signin") {
      document.getElementById("signin").style.display = "none";
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

      <button onClick={() => openForm("signin")}>Sign Up</button>

      <div className="signin">
        <div id="signin" className="modal">
          <span
            onClick={() => closeForm("signin")}
            className="close"
            title="Close Modal"
          >
            &times;
          </span>
          <form className="modal-content" onSubmit={ handleSignIn }>
            <div className="container">
              <h1>Sign Up</h1>
              <p>Please fill in this form to create an account.</p>
              <hr />
              <label for="email">
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value) }
                required
              />

              <label for="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label for="psw-repeat">
                <b>Repeat Password</b>
              </label>
              <input
                type="password"
                placeholder="Repeat Password"
                name="psw-repeat"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <p>
                By creating an account you agree to our{" "}
                <a href="#" style={{ color: "dodgerblue" }}>
                  Terms & Privacy
                </a>
                .
              </p>

              <div className="clearfix">
                <button
                  type="button"
                  onClick={() => closeForm("signin")}
                  className="cancelbtn"
                >
                  Cancel
                </button>
                <button type="submit" className="signupbtn">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Services;
