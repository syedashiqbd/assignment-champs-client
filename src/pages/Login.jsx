import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import logIn from '../assets/login.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const { login, logInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    login(email, password)
      .then(() => {
        toast.success('Successfully logged-in');
        // e.target.reset();

        // navigate after login
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        toast.error('Invalid-login-credentials');
      });
  };

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then(() => {
        toast.success('Successfully logged-in');

        // navigate after login
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        toast.error('Logged In failed !!');
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="flex flex-col lg:flex-row justify-between lg:w-[1280px] md:w-[780px] w-[400px] mx-auto border border-amber-600 rounded-lg mt-10">
        <div className="lg:w-1/2 w-6/12 lg:my-auto mx-auto py-10 lg:py-0">
          <img src={logIn} className="w-[460px]" />
        </div>
        <div className="lg:w-1/2">
          <div className="w-full  lg:p-16 p-3 ">
            <h1 className="text-[40px] font-semibold text-center">Login</h1>

            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-primary text-white">Login</button>
              </div>
              <p className="divider my-8 text-lg font-medium">
                Or Sign In with
              </p>
              <div className="flex justify-center gap-4">
                <Link onClick={handleGoogleLogin}>
                  <div className="w-[55px] h-[55px] rounded-full bg-[#F5F5F8] flex items-center justify-center text-xl">
                    <FcGoogle></FcGoogle>
                  </div>
                </Link>
                <Link>
                  <div className="w-[55px] h-[55px] rounded-full bg-[#F5F5F8] flex items-center justify-center text-xl text-blue-700">
                    <FaFacebookF></FaFacebookF>
                  </div>
                </Link>
                <Link>
                  <div className="w-[55px] h-[55px] rounded-full bg-[#F5F5F8] flex items-center justify-center text-xl text-blue-700 ">
                    <FaLinkedinIn></FaLinkedinIn>
                  </div>
                </Link>
              </div>
              <p className="text-center mt-6 lg:text-lg">
                Do not have an account?{' '}
                <Link to="/register" className="text-primary  font-semibold">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Login;
