import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";


const NotFoundPage = () => {

    return (
        <div className="text-center">
            <FaExclamationTriangle className="text-yellow-600 text-6xl mx-auto" />

            <h2 className="text-4xl mt-5 mb-8 font-medium">Page Not Found!</h2>

            <Link to="/" className="btn btn-sm border-0 bg-slate-600 hover:bg-slate-700 text-white">Return Back</Link>
        </div>
    );

};

export default NotFoundPage;
