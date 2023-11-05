import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import Loading1 from '../components/Loading1';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading1></Loading1>;
  }
  if (user) {
    return children;
  } else return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
