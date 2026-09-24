import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

const DEFAULT_CLASSES = "px-4 px-6 py-2 bg-blue-500 bg-red-500 text-white";

const buttonVariants = cva("rounded-md font-medium transition-colors", {
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      danger: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-gray-300 bg-white text-gray-900",
    },

    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    },

    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: "",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
    disabled: false,
  },
});

function TailwindMergePlayground() {
  const [input, setInput] = useState(DEFAULT_CLASSES);
  const [result, setResult] = useState(twMerge(DEFAULT_CLASSES));

  const [buttonVariant, setButtonVariant] = useState("primary");
  const [buttonSize, setButtonSize] = useState("md");

  // CLSX state
  const [isActive, setIsActive] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  const cvaResult = buttonVariants({
    variant: buttonVariant,
    size: buttonSize,
    disabled: isDisabled,
  });

  const [cnVariant, setCnVariant] = useState("primary");
  const [cnSize, setCnSize] = useState("md");
  const [customClass, setCustomClass] = useState("");


   const cn = (...inputs) => {
    return twMerge(clsx(inputs));
  };

  const cnResult = cn(
    buttonVariants({
      variant: cnVariant,
      size: cnSize,
    }),
    customClass
  );

  const handleMerge = () => {
    setResult(twMerge(input));
  };

  const clsxResult = clsx(
    "rounded-md px-4 py-2 font-medium",

    isActive && "bg-blue-500 text-white",

    !isActive && "bg-gray-200 text-gray-700",

    isDisabled && "cursor-not-allowed opacity-50",

    isLarge && "text-lg px-8"
  );

 

  return (
    <div className="p-6 space-y-8">
      {/* =========================
          TAILWIND MERGE
      ========================= */}

      <section>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Tailwind Merge Playground</h1>

          <p className="mt-1 text-gray-500">
            Experiment with conflicting Tailwind classes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}

          <div className="rounded-lg border p-5">
            <h2 className="font-semibold">Input Classes</h2>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-3 min-h-32 w-full rounded-md border p-3 font-mono text-sm"
            />

            <button
              onClick={handleMerge}
              className="mt-3 rounded-md bg-black px-4 py-2 text-sm text-white"
            >
              Merge Classes
            </button>
          </div>

          {/* Result */}

          <div className="rounded-lg border p-5">
            <h2 className="font-semibold">Merged Classes</h2>

            <pre className="mt-3 min-h-32 whitespace-pre-wrap rounded-md bg-gray-100 p-3 font-mono text-sm">
              {result}
            </pre>
          </div>
        </div>
      </section>

      {/* =========================
          CLSX
      ========================= */}

      <section className="border-t pt-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">CLSX Playground</h1>

          <p className="mt-1 text-gray-500">
            Build class names dynamically based on conditions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Controls */}

          <div className="rounded-lg border p-5">
            <h2 className="font-semibold">Conditions</h2>

            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />

                <span>isActive</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isDisabled}
                  onChange={(e) => setIsDisabled(e.target.checked)}
                />

                <span>isDisabled</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isLarge}
                  onChange={(e) => setIsLarge(e.target.checked)}
                />

                <span>isLarge</span>
              </label>
            </div>
          </div>

          {/* Result */}

          <div className="rounded-lg border p-5 overflow-x-auto">
            <h2 className="font-semibold">Generated Classes</h2>

            <pre className="mt-3 rounded-md bg-gray-100 p-3 font-mono text-sm">
              {clsxResult}
            </pre>

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-medium">Preview</h3>

              <button disabled={isDisabled} className={clsxResult}>
                Example Button
              </button>
            </div>
          </div>

          {/* =========================
    CVA
========================= */}

          <section className="border-t pt-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                CVA + CLSX + Tailwind Merge
              </h1>

              <p className="mt-1 text-gray-500">
                The common cn() pattern used in reusable component libraries.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Controls */}

              <div className="rounded-lg border p-5">
                <h2 className="font-semibold">Button Configuration</h2>

                <div className="mt-5 space-y-5">
                  {/* Variant */}

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Variant
                    </label>

                    <select
                      value={cnVariant}
                      onChange={(e) => setCnVariant(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="danger">Danger</option>
                      <option value="outline">Outline</option>
                    </select>
                  </div>

                  {/* Size */}

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Size
                    </label>

                    <select
                      value={cnSize}
                      onChange={(e) => setCnSize(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                    </select>
                  </div>

                  {/* Custom Classes */}

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Custom Tailwind Classes
                    </label>

                    <input
                      type="text"
                      value={customClass}
                      onChange={(e) => setCustomClass(e.target.value)}
                      placeholder="px-10 bg-purple-500"
                      className="w-full rounded-md border px-3 py-2 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Result */}

              <div className="rounded-lg border p-5">
                <h2 className="font-semibold">Final className</h2>

                <pre className="mt-3 overflow-x-auto rounded-md bg-gray-100 p-3 font-mono text-sm">
                  {cnResult}
                </pre>

                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-medium">Preview</h3>

                  <button className={cnResult}>Example Button</button>
                </div>

                <div className="mt-6 rounded-md bg-gray-900 p-4 text-sm text-white">
                  <p className="mb-2 font-medium">What happened?</p>

                  <code className="leading-6">
                    CVA → clsx → tailwind-merge → className
                  </code>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
export default TailwindMergePlayground;
