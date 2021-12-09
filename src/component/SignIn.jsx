import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../database/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "./signin.css";
const SignIn = () => {
  const navigate = useNavigate();
  //signin component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //signin function
  const handleSignIn = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user created: ", cred.user);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  var modal = document.getElementById("signin");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      navigate('/services');
    }
  };

  // form function
  function openForm(value) {
    if (value === "signin") {
      document.getElementById("signin").style.display = "block";
    }
  }
  // close function
  const closeForm = (value) => {
    if (value === "signin") {
      document.getElementById("signin").style.display = "none";
    }
    navigate('/services');
  };

  return (
    <>
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
          <form className="modal-content" onSubmit={handleSignIn}>
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
                onChange={(e) => setEmail(e.target.value)}
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
};

export default SignIn;
