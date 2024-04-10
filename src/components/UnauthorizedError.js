const UnauthorizedError = ({ error }) => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h2 className="text-3xl text-red-500 font-semibold">
        {error?.data?.message}
      </h2>
    </div>
  );
};

export default UnauthorizedError;
