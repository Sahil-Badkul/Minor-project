const Card = ({ menuData,deleteInfo }) => {  
    return (
      <>
        <section className="main-card--cointainer">
          {menuData.map((curElem) => {
            const { id, name, category, image, description } = curElem;
  
            return (
              <>
                <div className="card-container" key={id}>
                  <div className="card ">
                    <div className="card-body">
                      <span className="card-author subtle"> {category}</span>
                      <h2 className="card-title"> {name} </h2>
                      <span className="card-description subtle">
                        {description}
                      </span>
                      <div className="card-read">Read</div>
                    </div>
                    <img src={image} alt="images" className="card-media" />
  
                    <span className="card-tag  subtle">go there</span>
                    <button 
                      className='btn'
                      onClick={() => deleteInfo(id)} >
                        DELETE
                      </button>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </>
    );
  };
 
export default Card;