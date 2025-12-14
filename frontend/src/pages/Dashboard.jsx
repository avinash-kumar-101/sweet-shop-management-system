

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ❌ token nahi → login
    if (!token) {
      navigate("/");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Sweet Shop Dashboard</h1>

      <ul>
        <li>✔ User Authentication</li>
        <li>✔ Product Management (Backend ready)</li>
        <li>✔ Role based access (Backend)</li>
      </ul>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;