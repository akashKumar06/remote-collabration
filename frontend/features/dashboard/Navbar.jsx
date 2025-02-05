import { AlignJustify } from "lucide-react";

function Navbar({ onToggleSidbar }) {
  return (
    <div className="bg-[#2e2e30] p-2 border border-[#424244] flex">
      <div
        className=" rounded cursor-pointer hover:bg-[#424244] p-1"
        onClick={onToggleSidbar}
      >
        <AlignJustify color="#f5f4f3" />
      </div>
    </div>
  );
}

export default Navbar;
