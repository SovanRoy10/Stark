import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn,isLoaded } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
