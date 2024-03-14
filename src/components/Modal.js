const Modal = ({ children, modalName, title }) => {
  return (
    <div>
      <input type="checkbox" id={modalName} className="modal-toggle" />
      <div className="modal bg-[#00000094] z-[10000]">
        <div className="modal-box relative top-7 bg-[#DFF6FF]">
          <div>
            <label
              htmlFor={modalName}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h2 className="text-2xl text-center mb-4 second-font capitalize">
              {title}
            </h2>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
