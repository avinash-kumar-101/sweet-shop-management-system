
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🍭 Sweet Shop Dashboard</h1>

        <ul style={styles.list}>
          <li>✔ User Authentication</li>
          <li>✔ Product Management (Backend ready)</li>
          <li>✔ Role based access (Backend)</li>
        </ul>

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: 500,
    padding: 40,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  list: {
    marginTop: 20,
    marginBottom: 30,
  },
  logout: {
    padding: "10px 20px",
    background: "#e53e3e",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default Dashboard;