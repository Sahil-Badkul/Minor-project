import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="dark">
            <div className="not-found">
                <h2>Sorry</h2>
                <p>That page cannot be found</p>
                <Link to="/">Back to the home page...</Link>
            </div>
        </section>
    );
};

export default NotFound;
