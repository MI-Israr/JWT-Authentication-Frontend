import { logout } from "../api/auth";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout();
      alert(" Logged out successfully");
    } catch (err) {
      alert(" Logout failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="auth-container">
      <h2>Logout</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
