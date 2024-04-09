const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">{children}</table>
    </div>
  );
};

export default Table;
