import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import register from '../assets/register.svg';

const Register = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-between lg:w-[1280px] w-[400px] mx-auto">
        <div className="w-1/2">
          <div className="w-full border p-16 rounded-lg">
            <h1 className="text-[40px] font-semibold text-center">Register</h1>

            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
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
                  type="text"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Accept terms and conditions.
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-primary text-white">Register</button>
              </div>
              <p className="divider my-8 text-lg font-medium">
                Or Register with
              </p>
              <div className="flex justify-center gap-4">
                <Link>
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
              <p className="text-center mt-12 text-lg">
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
