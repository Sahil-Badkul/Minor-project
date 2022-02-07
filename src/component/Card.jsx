import { Link } from "react-router-dom";
import "./card.css";
const Card = ({ menuData }) => {
  return (
      <div className="main-card--cointainer">
        {menuData.map((curElem) => {
          const { id, name, category, image, description, price, location } = curElem;
          return (
              <div className="card-container" key={id}>
                <div className="card ">
                  <div className="card-body">
                    <span className="card-author subtle"> {category}</span>
                    <h2 className="card-title"> {name} </h2>
                    <p><i className="fas fa-map-marker-alt"> </i> Near - {location}</p>
                    <div className="card-read">Read</div>
                  </div>
                  <br />
                  <img src={image} alt="images" className="card-media" />
                  <br />
                  <p><span style={{color:'red'}}> &#8377;{price}</span></p>
                  <br />
                  <Link to={`/services/${id}`}>
                    <span className="card-tag subtle">Go there</span>
                  </Link>
                </div>
              </div>
          );
        })}
      </div>
  );
};

export default Card;
