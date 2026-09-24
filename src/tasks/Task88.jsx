import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  age: z
    .number({
      error: "Age is required",
    })
    .min(18, "You must be at least 18 years old").max(100, "You must be less than 100 years old"),
});

function Task88() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode : "onChange"
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">
        React Hook Form + Zod
      </h1>

      <p className="mb-6 text-gray-600">
        Form state management with schema validation
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block font-medium">
            Name
          </label>

          <input
            {...register("name")}
            className="w-full rounded-lg border px-4 py-2"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Email
          </label>

          <input
            {...register("email")}
            className="w-full rounded-lg border px-4 py-2"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Password
          </label>

          <input
            type="password"
            {...register("password")}
            className="w-full rounded-lg border px-4 py-2"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Age
          </label>

          <input
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border px-4 py-2"
          />

          {errors.age && (
            <p className="mt-1 text-sm text-red-500">
              {errors.age.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Task88;