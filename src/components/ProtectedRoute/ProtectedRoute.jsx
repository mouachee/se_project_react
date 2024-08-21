import { Navigate } from "react-router-dom";

function ProtectecRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectecRoute;
