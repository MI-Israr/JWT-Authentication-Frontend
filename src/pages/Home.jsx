import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <p>No user found. Please login again.</p>;
  }

  return (
    <div className="auth-container">
      <h2 className="welcome-text"> Welcome, {user.firstName}!</h2>

      <div className="user-card">
        {/* Profile Image */}
        <div className="profile-pic">
          <img src={user.photoUrl} alt={user.firstName} />
        </div>

        {/* User Details */}
        <div className="user-info">
          <p>
            <b>First Name:</b> {user.firstName}
          </p>
          <p>
            <b>Last Name:</b> {user.lastName}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>About:</b> {user.about}
          </p>
          <p>
            <b>Skills:</b>{" "}
            {user.skills && user.skills.length > 0
              ? user.skills.join(", ")
              : "No skills added"}
          </p>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
