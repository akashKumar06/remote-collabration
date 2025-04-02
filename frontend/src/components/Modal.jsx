import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../app/slices/modal";

function Modal({ children }) {
  const state = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <div
      className={`fixed right-0 top-0 h-screen w-2xl bg-black transition duration-700 ease-in-out    ${
        state ? "translate-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={() => dispatch(toggle())}
        className="text-white border-white border rounded"
      >
        close
      </button>
      <h1>Modal</h1>
      {children}
    </div>
  );
}

export default Modal;
