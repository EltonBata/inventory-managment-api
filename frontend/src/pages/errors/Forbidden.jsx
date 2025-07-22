import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

function Forbidden() {
  return (
    <>
      <div className="text-center">
        <FaLock className="text-red-700 text-6xl mx-auto" />

        <h2 className="text-4xl mt-5 mb-8 font-medium">Forbidden Page!</h2>

        <Link
          to="/"
          className="btn btn-sm border-0 bg-slate-600 hover:bg-slate-700 text-white"
        >
          Return Back
        </Link>
      </div>
    </>
  );
}

export default Forbidden;
