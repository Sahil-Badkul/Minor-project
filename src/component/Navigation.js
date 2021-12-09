import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="navbar">
        <div className="inner-width">
          <Link to="Minor-project/" className='logo'></Link>
          <button className="menu-toggler">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="navbar-menu">
            <Link to="/Minor-project/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to='/signin'>SignUp</Link>
            <Link to="/contact">Contact Us</Link>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
