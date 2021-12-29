import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="navbar">
        <div className="inner-width">
          <Link to="/" className='logo'></Link>
          <button className="menu-toggler">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="navbar-menu">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/create">Add Services</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
