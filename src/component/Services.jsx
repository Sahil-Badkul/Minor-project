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
import storage from "../database/Config";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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
  const [image, setImage] = useState('');
  const [description, setDescription] = useState("");

  //signin component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  //adding service
  const handleSubmit =  async (e) => {
    e.preventDefault();
    const info = { name, image, category, description };
    console.log(info);

    if (image == null)
      return;
    storage.ref(`/images/${image.name}`).put(image)
      .on("state_changed", alert("success"), alert);

    addDoc(servicesCollectionRef, {
      name,
      description,
      image,
      category,
    }).then(() => {
      console.log("Info added");
      closeForm('form');
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
    console.log(docRef);
    getDoc(docRef).then((doc) => {
      console.log(doc.data(), doc.name);
      alert(JSON.stringify(doc.data().name));
    });
  };

  //signin function
  const handleSignIn = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user created: ", cred.user.email);
        // window.location.reload();
        closeForm('signin');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('user logged in:', cred.user.email);
        closeForm('login');
      })
      .catch((err) => {
        alert(err.message);
      })
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log('The user sign out');
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  //Auth state change
  onAuthStateChanged(auth, (user) => {
    // if (user === null) {
    //   document.getElementById("signoutBtn").style.display = "none";
    //   document.getElementById("loginBtn").style.display = "block";
    // }
    //  else {
    //   document.getElementById("loginBtn").style.display = "none";
    //   document.getElementById("signoutBtn").style.display = "block";
    // }
    // document.getElementById("signinBtn").style.display = "none";
  })

  var signInModal = document.getElementById("signin");
  var lognInModal = document.getElementById("login");
  var myFormModal = document.getElementById("myForm");
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == signInModal) {
      signInModal.style.display = "none";
    } else if (event.target == lognInModal) {
      lognInModal.style.display = "none";
    } else if (event.target == myFormModal) {
      myFormModal.style.display = "none";
    }
  };

  // form function
  function openForm(value) {
    if (value === "form") {
      document.getElementById("myForm").style.display = "block";
    } else if (value === "signin") {
      document.getElementById("signin").style.display = "block";
      closeForm('login');
    } else if (value === "login") {
      document.getElementById("login").style.display = "block";
      closeForm('signin');
    }
  }

  // close function
  const closeForm = (value) => {
    if (value === "form") {
      document.getElementById("myForm").style.display = "none";
    } else if (value === "signin") {
      document.getElementById("signin").style.display = "none";
    } else if (value === "login") {
      document.getElementById("login").style.display = "none";
    }
  };

  return (
    <>
      <section className="dark">
        <div className="inner-width" style={{ marginTop: 30 }}>
          {/* <h1 className="section-title"> Our Services</h1> */}
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

          <div className="form-popup" id="myForm">
            <form onSubmit={handleSubmit} className="form-container">
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
                onChange={(e) => { setImage(e.target.files[0]) }}
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
        </div>
      </section>

      {/* Sign up */}
      <button onClick={() => openForm("signin")} id="signinBtn">Sign Up</button>

      <div className="signin">
        <div id="signin" className="modal">
          <span
            onClick={() => closeForm("signin")}
            className="close"
            title="Close Modal"
          >
            &times;
          </span>
          <form className="modal-content" onSubmit={handleSignIn}>
            <div className="container">
              <h1>Sign Up</h1>
              <p>Please fill in this form to create an account.</p>
              <br />
              <hr />
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="psw">
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

              <label  htmlFor="psw-repeat">
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
                <p>
                  Already have an account?{" "}
                  <a
                    onClick={() => openForm("login")}
                    style={{ color: "dodgerblue" }}
                  >
                    login
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Login */}
      <button onClick={() => openForm("login")} id="loginBtn">Login</button>

      <div className="login">
        <div id="login" className="modal">
          <span
            onClick={() => closeForm("login")}
            className="close"
            title="Close Modal"
          >
            &times;
          </span>
          <form className="modal-content" onSubmit={handleLogin}>
            <div className="container">
              <h1>login</h1>
              <br />
              <hr />
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="psw">
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

              <div className="clearfix">
                <button
                  type="button"
                  onClick={() => closeForm("login")}
                  className="cancelbtn"
                >
                  Cancel
                </button>
                <button type="submit" className="signupbtn">
                  login
                </button>
                <p>
                  Don't have an account?{" "}
                  <a
                    onClick={() => openForm("signin")}
                    style={{ color: "dodgerblue" }}
                  >
                    Creater account
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <button onClick={handleSignOut} id="signoutBtn">Sign Out</button>
    </>
  );
}
export default Services;
