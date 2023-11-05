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

const auth = getAuth(app);
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

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

  //   auth state observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('user state observer', currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // logout user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

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
