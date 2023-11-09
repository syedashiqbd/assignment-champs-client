import axios from 'axios';
// import useAuth from './useAuth';
// import { useEffect } from 'react';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  // baseURL: 'https://assignment-champs-server.vercel.app',
  withCredentials: true,
});

const useAxiosSecure = () => {
  // const { logout } = useAuth();
  // useEffect(() => {
  //   axiosInstance.interceptors.response.use(
  //     (res) => {
  //       return res;
  //     },
  //     (error) => {
  //       console.log('error from interceptors', error.response);
  //       if (error.response.status === 401 || error.response.status === 401) {
  //         logout()
  //           .then(() => {})
  //           .catch((error) => console.log(error));
  //       }
  //     }
  //   );
  // }, [logout]);
  return axiosInstance;
};

export default useAxiosSecure;
