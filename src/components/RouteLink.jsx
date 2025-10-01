import { Link } from "react-router-dom";
const RouteLink = ({ to, text }) => {
  return (
    <p className="route">
      {text}{" "}
      <Link to={`/${to}`} className="link">
        {to}
      </Link>
    </p>
  );
};

export default RouteLink;
