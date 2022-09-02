import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PrivateRoute({ children }: any) {
  const { currentUser, isEmailVerified } = useAuth();

  return currentUser ? (
    <>{isEmailVerified ? children : <Navigate to="/not-verified" />}</>
  ) : (
    <Navigate to="/login" />
  );
}
