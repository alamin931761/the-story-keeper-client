const TableHead = ({ children }) => {
  return (
    <thead>
      <tr>
        <th></th>
        {children}
      </tr>
    </thead>
  );
};

export default TableHead;
