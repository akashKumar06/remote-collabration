function NewTask() {
  return (
    <div>
      <h1>New Task</h1>
      <div>
        <input type="text" />
        <div>
          <select name="" id="">
            <option value="Assignee">Assignee</option>
          </select>
          <select name="" id="">
            <option value="Project">Project</option>
          </select>
        </div>
        <div>
          <textarea name="" id=""></textarea>
        </div>
      </div>
      <div>
        <button>Create Task</button>
      </div>
    </div>
  );
}

export default NewTask;
