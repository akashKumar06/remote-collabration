import { ArrowDownUp, ListFilter } from "lucide-react";
function InboxHeader() {
  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-semibold text-[#f5f4e6]">Inbox</h1>
      <ul className="flex gap-4 text-[#6a6d6b] font-medium mt-2 py-2">
        <li className="hover:text-[#f5f4e6] transition cursor-pointer">
          Activity
        </li>
        <li className="hover:text-[#f5f4e6] transition cursor-pointer">
          Archive
        </li>
        <li className="hover:text-[#f5f4e6] px-4 transition cursor-pointer">
          Messages I&apos;ve Sent
        </li>
      </ul>
    </div>
  );
}
function Filters() {
  return (
    <div className="text-sm font-semibold flex gap-5 py-4 px-2 text-[#6a6d6d] border-t border-b">
      <div className="flex gap-2 items-center justify-center hover:text-[#f5f4e6] transition hover:bg-[#6a6d6b] rounded cursor-pointer px-1 py-1">
        <ListFilter size={15} />
        <span>Filter</span>
      </div>
      <div className="cursor-pointer flex gap-2 items-center justify-center hover:text-[#f5f4e6] transition hover:bg-[#6a6d6b] rounded px-1 py-1">
        <ArrowDownUp size={15} />
        <span>Sort</span>
      </div>
    </div>
  );
}
function Inbox() {
  return (
    <div className="flex flex-col">
      <InboxHeader />
      <Filters />
      <main></main>
    </div>
  );
}

export default Inbox;
