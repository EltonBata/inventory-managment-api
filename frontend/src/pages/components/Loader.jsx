import { ClipLoader } from "react-spinners";

export default function Loader({ loading }) {
  return (
    <div className="w-dvw min-h-screen absolute top-0 left-0 flex items-center justify-center bg-slate-700/50 z-50">
      <ClipLoader color="#fff" size={150} loading={loading} />
    </div>
  );
}
