const Service = ({ children }) => {
  return (
    <div
      className="flex flex-col items-center my-5"
      data-aos="flip-left"
      data-aos-duration="3000"
    >
      {children}
    </div>
  );
};

export default Service;
