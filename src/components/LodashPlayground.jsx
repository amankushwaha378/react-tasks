import { useState, useMemo } from "react";
import _ from "lodash";

function LodashPlayground() {
  const [selectedUtility, setSelectedUtility] = useState("chunk");

  // 1. Chunk state
  const [chunkSize, setChunkSize] = useState(2);
  const chunkArray = [1, 2, 3, 4, 5, 6, 7, 8];

  // 2. Compact data
  const compactArray = [0, 1, false, 2, "", 3, null, undefined, "hello"];

  // 3. Uniq state
  const [uniqInput, setUniqInput] = useState(
    "apple, banana, apple, orange, banana"
  );

  // 4. GroupBy data
  const users = [
    { name: "Aman", status: "Active" },
    { name: "Rahul", status: "Inactive" },
    { name: "Priya", status: "Active" },
    { name: "Neha", status: "Inactive" },
  ];
  const [groupKey, setGroupKey] = useState("status");

  // 5. Debounce state
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");

  const updateDebouncedText = useMemo(
    () => _.debounce((val) => setDebouncedText(val), 500),
    []
  );

  const handleTextChange = (e) => {
    setText(e.target.value);
    updateDebouncedText(e.target.value);
  };

  // 6. Get state
  const sampleUser = {
    name: "Aman",
    address: {
      city: "Delhi",
      pin: 110001,
    },
  };
  const [getPath, setGetPath] = useState("address.city");

  // 7. CloneDeep state
  const [cloneStatus, setCloneStatus] = useState(
    "Click a button below to test mutation."
  );
  const [originalObj, setOriginalObj] = useState({
    name: "Aman",
    details: { role: "Developer" },
  });

  const testShallowMutation = () => {
    const shallow = { ...originalObj };
    shallow.details.role = "Hacked Role (Shallow Mutation!)";
    setOriginalObj({ ...originalObj });
    setCloneStatus("Shallow copy mutated the original nested role!");
  };

  const testDeepClone = () => {
    const deep = _.cloneDeep(originalObj);
    deep.details.role = "Super Admin (Deep Clone)";
    setOriginalObj({ ...originalObj });
    setCloneStatus(
      "Deep clone modified its own copy without touching original!"
    );
  };

  const resetCloneDemo = () => {
    setOriginalObj({ name: "Aman", details: { role: "Developer" } });
    setCloneStatus("Reset to initial state.");
  };

  // 8. IsEqual data
  const objA = { name: "Aman", skills: ["React", "Node"] };
  const objB = { name: "Aman", skills: ["React", "Node"] };

  // 9. Throttle state
  const [clicks, setClicks] = useState(0);
  const [throttledClicks, setThrottledClicks] = useState(0);

  const updateThrottledClicks = useMemo(
    () => _.throttle(() => setThrottledClicks((c) => c + 1), 1000),
    []
  );

  const handleThrottleClick = () => {
    setClicks((c) => c + 1);
    updateThrottledClicks();
  };

  // 10. SortBy state
  const sortEmployees = [
    { name: "Rahul", age: 28, salary: 50000 },
    { name: "Aman", age: 22, salary: 60000 },
    { name: "Priya", age: 25, salary: 75000 },
    { name: "Neha", age: 21, salary: 45000 },
  ];
  const [sortKey, setSortKey] = useState("age");

  const utilities = [
    {
      name: "chunk",
      description: "Splits an array into groups of a specified size.",
    },
    {
      name: "compact",
      description:
        "Removes all falsey values (0, false, null, undefined, '') from an array.",
    },
    {
      name: "uniq",
      description: "Removes duplicate values from an array.",
    },
    {
      name: "groupBy",
      description: "Groups collection elements based on an object key.",
    },
    {
      name: "debounce",
      description: "Delays execution until the user stops typing for 500ms.",
    },
    {
      name: "get",
      description:
        "Safely reads nested properties with a default fallback (no undefined crashes).",
    },
    {
      name: "cloneDeep",
      description:
        "Deeply clones an object so nested objects/arrays are not copied by reference.",
    },
    {
      name: "isEqual",
      description:
        "Performs a deep comparison between two values to check if they are equivalent.",
    },
    {
      name: "throttle",
      description:
        "Executes a function at most once per specified time period (1000ms).",
    },
    {
      name: "sortBy",
      description:
        "Sorts collection by an object key without mutating the original array.",
    },
  ];

  const selected = utilities.find((u) => u.name === selectedUtility);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">Lodash Playground</h1>
      <p className="mt-1 text-gray-500">
        10 essential Lodash utilities with simple, interactive examples.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-lg border bg-white p-3 space-y-1">
          <h2 className="px-3 py-1 text-xs font-bold uppercase text-gray-400">
            Utilities ({utilities.length})
          </h2>
          {utilities.map((u) => (
            <button
              key={u.name}
              onClick={() => setSelectedUtility(u.name)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                selectedUtility === u.name
                  ? "bg-blue-600 text-white font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              _.{u.name}()
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="rounded-lg border bg-white p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold font-mono">_.{selected.name}()</h2>
            <p className="mt-1 text-sm text-gray-500">{selected.description}</p>
          </div>

          <div className="rounded-lg border bg-gray-50 p-4 space-y-4">
            {/* 1. Chunk Demo */}
            {selectedUtility === "chunk" && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Input Array:
                  </label>
                  <p className="font-mono text-sm text-gray-600">
                    [1, 2, 3, 4, 5, 6, 7, 8]
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Chunk Size: {chunkSize}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={chunkSize}
                    onChange={(e) => setChunkSize(Number(e.target.value))}
                    className="mt-1 block w-48"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Result:{" "}
                    <span className="font-mono text-blue-600">
                      _.chunk(array, {chunkSize})
                    </span>
                  </label>
                  <pre className="mt-1 rounded bg-gray-900 p-3 font-mono text-xs text-green-400">
                    {JSON.stringify(_.chunk(chunkArray, chunkSize))}
                  </pre>
                </div>
              </div>
            )}

            {/* 2. Compact Demo */}
            {selectedUtility === "compact" && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Input Array (with falsy values):
                  </label>
                  <p className="font-mono text-sm text-gray-600">
                    [0, 1, false, 2, &apos;&apos;, 3, null, undefined,
                    &apos;hello&apos;]
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Result:{" "}
                    <span className="font-mono text-blue-600">
                      _.compact(array)
                    </span>
                  </label>
                  <pre className="mt-1 rounded bg-gray-900 p-3 font-mono text-xs text-green-400">
                    {JSON.stringify(_.compact(compactArray))}
                  </pre>
                </div>
              </div>
            )}

            {/* 3. Uniq Demo */}
            {selectedUtility === "uniq" && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Items with duplicates (comma-separated):
                  </label>
                  <input
                    type="text"
                    value={uniqInput}
                    onChange={(e) => setUniqInput(e.target.value)}
                    className="mt-1 w-full rounded border px-3 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Result:{" "}
                    <span className="font-mono text-blue-600">
                      _.uniq(array)
                    </span>
                  </label>
                  <pre className="mt-1 rounded bg-gray-900 p-3 font-mono text-xs text-green-400">
                    {JSON.stringify(
                      _.uniq(
                        uniqInput
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    )}
                  </pre>
                </div>
              </div>
            )}

            {/* 4. GroupBy Demo */}
            {selectedUtility === "groupBy" && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Users List:
                  </label>
                  <pre className="mt-1 rounded border bg-white p-2 font-mono text-xs text-gray-700">
                    {JSON.stringify(users, null, 2)}
                  </pre>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Group by key:
                  </label>
                  <select
                    value={groupKey}
                    onChange={(e) => setGroupKey(e.target.value)}
                    className="ml-2 rounded border px-2 py-1 text-sm"
                  >
                    <option value="status">status</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Result:{" "}
                    <span className="font-mono text-blue-600">
                      _.groupBy(users, &apos;{groupKey}&apos;)
                    </span>
                  </label>
                  <pre className="mt-1 rounded bg-gray-900 p-3 font-mono text-xs text-green-400">
                    {JSON.stringify(_.groupBy(users, groupKey), null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* 5. Debounce Demo */}
            {selectedUtility === "debounce" && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Type here (delays 500ms):
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Start typing fast..."
                    className="mt-1 w-full rounded border px-3 py-1.5 text-sm"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold text-gray-700">
                      Immediate input:
                    </span>{" "}
                    {text || "—"}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">
                      Debounced value:
                    </span>{" "}
                    {debouncedText || "—"}
                  </p>
                </div>
              </div>
            )}

            {/* 6. Get Demo */}
            {selectedUtility === "get" && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Source Object:
                  </label>
                  <pre className="mt-1 rounded border bg-white p-2 font-mono text-xs text-gray-700">
                    {JSON.stringify(sampleUser, null, 2)}
                  </pre>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Enter path to read:
                  </label>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={getPath}
                      onChange={(e) => setGetPath(e.target.value)}
                      className="rounded border px-3 py-1.5 text-sm font-mono"
                    />
                    <button
                      onClick={() => setGetPath("address.city")}
                      className="rounded border bg-white px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
                    >
                      address.city
                    </button>
                    <button
                      onClick={() => setGetPath("contact.phone")}
                      className="rounded border bg-white px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
                    >
                      contact.phone (missing)
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Result:{" "}
                    <span className="font-mono text-blue-600">
                      _.get(sampleUser, &apos;{getPath}&apos;, &apos;Not
                      Available&apos;)
                    </span>
                  </label>
                  <p className="mt-1 rounded bg-gray-900 p-3 font-mono text-sm text-green-400">
                    {String(_.get(sampleUser, getPath, "Not Available"))}
                  </p>
                </div>
              </div>
            )}

            {/* 7. CloneDeep Demo */}
            {selectedUtility === "cloneDeep" && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Original Object:
                  </label>
                  <pre className="mt-1 rounded border bg-white p-2 font-mono text-xs text-gray-700">
                    {JSON.stringify(originalObj, null, 2)}
                  </pre>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={testShallowMutation}
                    className="rounded bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Mutate via Shallow Copy ({`{...obj}`})
                  </button>
                  <button
                    onClick={testDeepClone}
                    className="rounded bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                  >
                    Mutate via _.cloneDeep()
                  </button>
                  <button
                    onClick={resetCloneDemo}
                    className="rounded border bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Reset
                  </button>
                </div>
                <p className="rounded bg-gray-900 p-3 font-mono text-xs text-green-400">
                  {cloneStatus}
                </p>
              </div>
            )}

            {/* 8. IsEqual Demo */}
            {selectedUtility === "isEqual" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="rounded border bg-white p-2">
                    <span className="font-semibold text-gray-500">
                      Object A:
                    </span>
                    <pre>{JSON.stringify(objA, null, 2)}</pre>
                  </div>
                  <div className="rounded border bg-white p-2">
                    <span className="font-semibold text-gray-500">
                      Object B:
                    </span>
                    <pre>{JSON.stringify(objB, null, 2)}</pre>
                  </div>
                </div>

                <div className="rounded border bg-white p-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-gray-700">
                      objA === objB (JavaScript)
                    </span>
                    <span className="font-bold text-red-600">
                      false (different references)
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="font-mono text-gray-700">
                      _.isEqual(objA, objB) (Lodash)
                    </span>
                    <span className="font-bold text-green-600">
                      true (deep value match)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 9. Throttle Demo */}
            {selectedUtility === "throttle" && (
              <div className="space-y-3">
                <button
                  onClick={handleThrottleClick}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition"
                >
                  ⚡ Click Fast!
                </button>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded border bg-white p-3 text-center">
                    <p className="text-gray-500 text-xs">Total Raw Clicks</p>
                    <p className="text-2xl font-bold text-gray-800">{clicks}</p>
                  </div>
                  <div className="rounded border bg-white p-3 text-center">
                    <p className="text-gray-500 text-xs">
                      Throttled Calls (max 1/sec)
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {throttledClicks}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 10. SortBy Demo */}
            {selectedUtility === "sortBy" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Sort by:
                  </label>
                  {["age", "salary", "name"].map((key) => (
                    <button
                      key={key}
                      onClick={() => setSortKey(key)}
                      className={`rounded px-2.5 py-1 text-xs border ${
                        sortKey === key
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Result:{" "}
                    <span className="font-mono text-blue-600">
                      _.sortBy(employees, &apos;{sortKey}&apos;)
                    </span>
                  </label>
                  <pre className="mt-1 rounded bg-gray-900 p-3 font-mono text-xs text-green-400">
                    {JSON.stringify(_.sortBy(sortEmployees, sortKey), null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default LodashPlayground;
