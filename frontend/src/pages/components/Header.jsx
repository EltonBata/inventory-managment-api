import { useAuth } from "../../contexts/AuthContext";
import { FaChevronDown, FaDoorOpen, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useAuth();

  const roleNames = user.roles.map((r) => r.role_name);

  return (
    <div className="navbar bg-white shadow-sm">
      <div className="navbar-start sm:hidden">
        <div className="dropdown">
          <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow border border-base-200 text-base"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center sm:navbar-start">
        <a className="btn btn-ghost text-sm sm:text-base tracking-wid hover:bg-transparent active:bg-transparent hover:border-0">
          <span className="text-sky-800">INVENTORY</span>{" "}
          <span className="text-slate-600">MANAGMENT</span>
        </a>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end z-30">
          <div
            tabIndex="0"
            role="button"
            className="btn btn-ghost font-normal flex-col gap-0 hover:bg-transparent active:bg-transparent hover:border-0"
          >
            <div className="flex items-center gap-x-1.5 font-medium">
              <FaUser />
              {user.username}
              <FaChevronDown className="text-xs font-light" />
            </div>

            <span className="text-gray-500 text-xs">{roleNames.join()}</span>
          </div>
          <ul
            tabIndex="0"
            className="dropdown-content menu bg-white border border-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <Link to="/logout">
                <FaDoorOpen />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
