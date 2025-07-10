function Card({ children, wd = "w-full sm:w-2/3 md:w-3/5 lg:w-2/5" }) {
  return (
    <div className="w-dvw min-h-screen flex items-center justify-center bg-linear-to-r from-slate-200 to-slate-500 py-10">
      <div className={`card ${wd} glass card-md shadow-md rounded-box border`}>
        <div className="card-body px-6">
          <h2 className="card-title tracking-wid flex justify-center py-4 text-xl">
            <span className="text-sky-800">INVENTORY</span>{" "}
            <span className="text-slate-600">MANAGMENT</span>
          </h2>

          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
