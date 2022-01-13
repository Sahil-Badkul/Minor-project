import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../database/Config'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = ({ isAuth, setIsAuth }) => {
  const [search, setSearch] = useState('')
  const handleClick = () => {
    document.querySelector(".menu-toggler").classList.toggle("active");
    document.querySelector(".navbar-menu").classList.toggle("active");
  };

  const navigate = useNavigate();
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.reload();
      navigate("/login");
    });
  };
  return (
    <>
      <nav className="navbar">
        <div className="inner-width">
          <Link to="/" className="logo"></Link>
          <button className="menu-toggler" onClick={handleClick}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="navbar-menu">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/uploadimages">Upload Images</Link>
            {!isAuth ? (
              <Link to="/login">Login </Link>
            ) : (
              <>
                <Link to="/create">Add Services</Link>
                <Link to="#" onClick={signUserOut}>
                  Log Out
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
