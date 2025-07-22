import { BsBoxSeamFill } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-500 shadow-sm w-full absolute left-0 top-0 h-full">
      <ul className="menu text-gray-50 my-4 w-full">
        {user.roles[0].role_name === "admin" ? (
          <li>
            <Link to="/admin/products">
              <BsBoxSeamFill />
              <span>Products</span>
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}
