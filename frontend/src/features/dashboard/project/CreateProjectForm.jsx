function CreateProjectForm() {
  return (
    <div className="p-10 w-90">
      <h1 className="text-2xl">New Project</h1>
      <form className="mt-8">
        <div className="mt-2">
          <label htmlFor="project_name" className="block text-sm">
            Project Name
          </label>
          <input
            type="text"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="team">Select a team</label>
          <select
            name=""
            id=""
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Akash first team</option>
          </select>
        </div>
        <div className="mt-4">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProjectForm;
