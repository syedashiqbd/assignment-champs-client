import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import register from '../assets/register.svg';
import useAuth from '../hook/useAuth';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const { createUser } = useAuth();
  const [registerError, setRegisterError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photo, email, password);

    if (password.length < 6) {
      setRegisterError('Password should be at least 6 characters or longer');
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError('You should at least 1 Uppercase');
      return;
    } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)) {
      setRegisterError('You should a special character');
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        setRegisterError('');
        toast.success('You have register successfully', {});
        // e.target.reset();
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        window.location.reload();
      })
      .catch((err) => toast.error(err.message, {}));
  };

  return (
    <div>
      <div className="flex justify-between lg:w-[1280px] w-[400px] mx-auto border rounded-lg">
        <div className="w-1/2">
          <div className="w-full  p-16 ">
            <h1 className="text-[40px] font-semibold text-center">Register</h1>

            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="photo URL"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  required
                  type="email"
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
                  required
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {registerError && (
                  <p className="text-red-700 mt-4">{registerError}</p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Accept terms and conditions.
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-primary text-white">Register</button>
              </div>

              <p className="text-center mt-6 text-lg">
                Already have an account?{' '}
                <Link to="/login" className="text-primary  font-semibold">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="w-1/2 my-auto ">
          <img src={register} className="w-[460px] mx-auto" />
        </div>
      </div>
    </div>
  );
};
export default Register;
