import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import useAxiosSecure from '../hook/useAxiosSecure';

const auth = getAuth(app);
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosSecure();

  // SignIn with google
  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //   Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   auth state observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('user state observer', currentUser);
      setUser(currentUser);
      setLoading(false);
      // generate token when user email is exist
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };

      if (currentUser) {
        axiosInstance.post('/jwt', loggedUser).then((res) => {
          console.log(res.data);
        });
      } else {
        axiosInstance.post('/logout', loggedUser).then((res) => {
          console.log(res.data);
        });
      }
    });
    return () => {
      unSubscribe();
    };
  }, [axiosInstance, user?.email]);

  const authContent = {
    user,
    loading,
    logInWithGoogle,
    createUser,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={authContent}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
