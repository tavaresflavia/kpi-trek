import "./NotFound.scss";
import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <div className = "not-found">
            <p className = "not-found__title">Sorry, the page you were looking for was not found.</p>
            <Link className = "not-found__text" to="/"> Go to Home </Link>
        </div>
    );
};

export default NotFound;