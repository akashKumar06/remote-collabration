function ProjectDasboard() {
  return (
    <div>
      <div className="flex gap-4 justify-center mt-2">
        <div className="w-36 h-36 border rounded p-2">Completed tasks</div>
        <div className="w-36 h-36 border rounded p-2">Incomplete tasks</div>
        <div className="w-36 h-36 border rounded p-2">Overdue tasks</div>
        <div className="w-36 h-36 border rounded p-2">total tasks</div>
      </div>
      <div className="flex mt-5 flex-wrap gap-6">
        <div className="w-96 h-96 border rounded"></div>
        <div className="w-96 h-96 border rounded"></div>
        <div className="w-96 h-96 border rounded"></div>
        <div className="w-96 h-96 border rounded"></div>
      </div>
    </div>
  );
}

export default ProjectDasboard;
