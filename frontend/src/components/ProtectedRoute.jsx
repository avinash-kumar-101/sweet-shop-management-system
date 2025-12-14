import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // token nahi hai → login pe bhej do
    return <Navigate to="/" replace />;
  }

  // token hai → page dikhao
  return children;
};

export default ProtectedRoute;