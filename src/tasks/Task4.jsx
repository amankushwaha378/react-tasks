import { useState } from "react";
import MultiSelect from "../components/MultiSelect";

function Task4() {
  const options = [
    {
      value: "react",
      label: "React",
    },
    {
      value: "express",
      label: "express",
    },
    {
      value: "mongoDb",
      label: "MongoDb",
    },
    {
      value: "node",
      label: "Nodejs",
    },
  ];

  const [selectedSkills, setSelectedSkills] = useState(["mongoDb", "node"]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(selectedSkills);
  };

  return (
    <form onSubmit={handleSubmit} className="p-10">
      <MultiSelect
        options={options}
        value={selectedSkills}
        onChange={setSelectedSkills}
        placeholder="Select Skills"
        className="w-20"
        size="md"
      />

      <button
        type="submit"
        className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}

export default Task4;
