import { CircleCheck, CirclePlus, House, InboxIcon } from "lucide-react";
import { motion } from "framer-motion";

function Div({ icon, name, isToggled }) {
  return (
    <div className="flex items-center transition-all duration-300 hover:bg-[#3a3a3c] py-2 px-1 rounded cursor-pointer">
      {/* Icon - Will Expand When Toggled */}
      <div
        className={`transition-all flex items-center justify-center duration-300 ${
          isToggled ? "flex-1" : ""
        }`}
      >
        {icon}
      </div>

      {/* Text - Will Shrink & Hide */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isToggled ? "w-0 opacity-0" : "w-full opacity-100"
        }`}
      >
        <p className="text-white whitespace-nowrap ml-2">{name}</p>
      </div>
    </div>
  );
}

function Sidebar({ isToggled }) {
  return (
    <motion.div
      initial={{ width: "16rem" }}
      animate={{ width: isToggled ? "4rem" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-[#2e2e30] border-r border-l border-[#424244] p-2 flex flex-col gap-1"
    >
      <Div
        icon={<CirclePlus color="#a19fa1" />}
        name="Create"
        isToggled={isToggled}
      />
      <Div icon={<House color="#a19fa1" />} name="Home" isToggled={isToggled} />
      <Div
        icon={<CircleCheck color="#a19fa1" />}
        name="My Tasks"
        isToggled={isToggled}
      />
      <Div
        icon={<InboxIcon color="#a19fa1" />}
        name="Inbox"
        isToggled={isToggled}
      />
    </motion.div>
  );
}

export default Sidebar;
