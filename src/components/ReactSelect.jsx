import { useState } from "react";
import Select from "react-select";

const options = [
  {
    value: "react",
    label: "React",
  },
  {
    value: "vue",
    label: "Vue",
    isDisabled : true
  },
  {
    value: "angular",
    label: "Angular",
  },
  {
    value: "svelte",
    label: "Svelte",
  },
];

const groupedOptions = [
  {
    label: "Frontend",
    options: [
      {
        value: "react",
        label: "React",
      },
      {
        value: "vue",
        label: "Vue",
      },
    ],
  },

  {
    label: "Backend",
    options: [
      {
        value: "node",
        label: "Node.js",
      },
      {
        value: "django",
        label: "Django",
      },
    ],
  },
];

function ReactSelectPlayground() {
  const [selected, setSelected] = useState(null);  

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          React Select Playground
        </h1>

        <p className="mt-1 text-gray-500">
          Explore the features of react-select.
        </p>
      </div>

      <div className="max-w-xl rounded-lg border p-6">

        <h2 className="mb-4 font-semibold">
          Multi Select + Search + Groups
        </h2>

        <Select
        //   options={options}
        options={groupedOptions}
          value={selected}
          onChange={setSelected}
          placeholder="Select a framework..."
          isMulti
          isSearchable
          isClearable
        />

        <div className="mt-6">

          <h3 className="text-sm font-medium">
            Selected value
          </h3>

          <pre className="mt-2 rounded-md bg-gray-100 p-3 text-sm">
            {JSON.stringify(selected, null, 2)}
          </pre>

        </div>

      </div>

    </div>
  );
}

export default ReactSelectPlayground;