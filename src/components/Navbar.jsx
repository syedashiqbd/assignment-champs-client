import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-4 '
            : 'py-1 px-2 mr-4'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/assignment"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-4 '
            : 'py-1 px-2 mr-4'
        }
      >
        Assignment
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-4 '
            : 'py-1 px-2 mr-4'
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive
            ? ' bg-primary text-white py-1 px-2 rounded  mr-4 '
            : 'py-1 px-2 mr-4'
        }
      >
        Register
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100 lg:w-[1280px] w-[400px] mx-auto mb-10 p-0">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <a className=" bg-primary p-2 rounded text-white text-xl">
          Assignment <br />
          Champs
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Get started</a>
      </div>
    </div>
  );
};
export default Navbar;
