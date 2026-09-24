import { useState } from "react";
import CustomSelect from "../components/CustomSelect";

function Task9() {
  const [role, setRole] = useState("");

  const roles = [
    { label: "Frontend Developer", value: "frontend" },
    { label: "Backend Developer", value: "backend" },
    { label: "Full Stack Developer", value: "fullstack" },
    { label: "UI/UX Designer", value: "designer" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">User Profile</h1>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          Select Role
        </label>
        <CustomSelect
          options={roles}
          value={role}
          onChange={setRole}
          placeholder="Select role..."
          size="md"
          direction="bottom"
          disabled={false}
          clearable
          fullWidth
          className=""
          required
        />
        <p className="mt-4 text-sm text-gray-600">
          Selected role: {role || "None"}
        </p>
      </div>
    </div>
  );
}

export default Task9;
