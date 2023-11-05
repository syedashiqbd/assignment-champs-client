import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hook/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen grid place-items-center">
        <span className="loading loading-spinner text-primary "></span>
      </div>
    );
  }
  if (user) {
    return children;
  } else return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
