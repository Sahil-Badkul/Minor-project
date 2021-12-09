import "./login.css";
import Avatar from "../images/img_avatar2.png";
const LogIn = () => {
  var modal2 = document.getElementById("login");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
  };

  // form function
  function openForm(value) {
    if (value === "login") {
      document.getElementById("login").style.display = "block";
    }
  }
  // close function
  const closeForm = (value) => {
    if (value === "login") {
      document.getElementById("login").style.display = "none";
    }
  };

  return (
    <>
      <div className="login">
        <button onclick={() => openForm("login")}>Login</button>
        <div id="login" className="modal">
          <form className="modal-content animate">
            <div className="imgcontainer">
              <span
                onclick={() => closeForm("login")}
                className="close"
                title="Close Modal"
              >
                &times;
              </span>
              <img src={Avatar} alt="Avatar" className="avatar" />
            </div>

            <div className="container">
              <label for="uname">
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
              />

              <label for="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />

              <button type="submit">Login</button>
              <label>
                <input type="checkbox" checked="checked" name="remember" />{" "}
                Remember me
              </label>
            </div>

            <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
              <button
                type="button"
                onclick={() => closeForm("login")}
                className="cancelbtn"
              >
                Cancel
              </button>
              <span classNameName="psw">
                Forgot <a href="#">password?</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
