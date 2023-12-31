import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import userDefaultPic from '../assets/user.png';
import toast from 'react-hot-toast';
import logo from '../assets/Assignment.png';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogOut = () => {
    toast.success('Successfully logged-out');
    logout();
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-2 '
            : 'py-1 px-2 mr-2 text-[#3149fd]'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/assignments"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-2 '
            : 'py-1 px-2 mr-2 text-[#3149fd]'
        }
      >
        Assignments
      </NavLink>
      <NavLink
        to="/create-assignment"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-2  '
            : 'py-1 px-2 mr-2 text-[#3149fd] '
        }
      >
        Create Assignment
      </NavLink>
      <NavLink
        to="/submit-assignments"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-2  '
            : 'py-1 px-2 mr-2 text-[#3149fd] '
        }
      >
        Submitted Assignment
      </NavLink>
      <NavLink
        to="/my-assignment"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-2  '
            : 'py-1 px-2 mr-2 text-[#3149fd] '
        }
      >
        My Assignment
      </NavLink>

      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-2 '
            : 'py-1 px-2 mr-2 text-[#3149fd]'
        }
      >
        Register
      </NavLink>
    </>
  );
  return (
    <div className="bg-[#111827]">
      <div className="navbar  lg:w-[1280px] md:w-[780px] w-[400px] mx-auto pt-5 pb-10 p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="#fff"
                viewBox="0 0 24 24"
                stroke="#fff"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[2]"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <img src={logo} className="lg:w-24 w-16" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end ">
          {user ? (
            <div className="dropdown dropdown-end ">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded  ">
                  {user.photoURL ? (
                    <img className="rounded-full" src={user.photoURL} />
                  ) : (
                    <img src={userDefaultPic} />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[2] p-2 shadow menu menu-sm dropdown-content border  rounded-md w-52 space-y-2 bg-white"
              >
                <p className="font-bold mb-5 text-center border-b-2 border-black pb-2">
                  {user?.displayName}
                </p>
                <p className="text-center font-semibold">{user?.email}</p>
                <Link onClick={handleLogOut}>
                  <button className="btn btn-sm bg-primary text-white w-full ">
                    Logout
                  </button>
                </Link>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn  bg-primary lg:text-base px-10 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
