import UserLogo from "../../../components/UserLogo";

function Messages() {
  return (
    <div className="flex flex-col p-10 items-center justify-center gap-6">
      <div className="w-4xl px-10 py-4 flex gap-2">
        <UserLogo />
        <button className="flex-1">Send message to members</button>
      </div>
      <div className="w-4xl"></div>
      <div className="w-4xl"></div>
    </div>
  );
}

export default Messages;
