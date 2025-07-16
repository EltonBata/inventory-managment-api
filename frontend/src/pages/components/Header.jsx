import { useAuth } from "../../contexts/AuthContext";
import { FaChevronDown, FaDoorOpen, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useAuth();

  return (
    <div className="navbar bg-white shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-sm sm:text-base tracking-wid">
          <span className="text-sky-800">INVENTORY</span>{" "}
          <span className="text-slate-600">MANAGMENT</span>
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end z-30">
          <div tabIndex="0" role="button" className="btn btn-ghost font-normal">
            <FaUser />
            {user.username}
            <FaChevronDown className="text-xs font-light" />
          </div>
          <ul
            tabIndex="0"
            className="dropdown-content menu bg-white border border-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a>Item 1</a>
            </li>
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
