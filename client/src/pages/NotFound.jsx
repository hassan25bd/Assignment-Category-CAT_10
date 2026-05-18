import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="section container not-found">
      <h1>404</h1>
      <p>The page you are looking for was not found.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
