const Card = ({ children, wd = 'w-2/5' }) => {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center border">
      <div className={`card ${wd} bg-white card-md shadow-sm rounded-box`}>
        <div className="card-body px-6">
          <h2 className="card-title tracking-wid flex justify-center py-4">
            <span className="text-sky-800">INVENTORY</span>{" "}
            <span className="text-slate-600">MANAGMENT</span>
          </h2>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
