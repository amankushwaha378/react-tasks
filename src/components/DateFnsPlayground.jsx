import { useState } from "react";
import {
  format,
  addDays,
  subDays,
  differenceInDays,
  isBefore,
  isAfter,
} from "date-fns";

function DateFnsPlayground() {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState(7);

  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(
    addDays(new Date(), 7)
  );

  // -------------------------
  // Helpers
  // -------------------------

  const toInputDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const handleDateChange = (value, setter) => {
    setter(new Date(`${value}T00:00:00`));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          date-fns Playground
        </h1>

        <p className="mt-2 text-gray-500">
          Explore common date-fns utilities interactively.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* =========================
            1. FORMAT
        ========================= */}

        <section className="rounded-lg border bg-white p-6">
          <h2 className="text-xl font-semibold">
            1. format()
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Convert a JavaScript Date into a readable string.
          </p>

          <input
            type="date"
            value={toInputDate(date)}
            onChange={(e) =>
              handleDateChange(e.target.value, setDate)
            }
            className="mt-4 rounded-md border px-3 py-2"
          />

          <div className="mt-5 rounded-md bg-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Result
            </p>

            <p className="mt-1 text-xl font-semibold">
              {format(date, "dd MMMM yyyy")}
            </p>
          </div>

          <div className="mt-4 rounded-md bg-gray-900 p-4 text-sm text-white">
            <code>
              format(date, "dd MMMM yyyy")
            </code>
          </div>
        </section>

        {/* =========================
            2. ADD DAYS
        ========================= */}

        <section className="rounded-lg border bg-white p-6">
          <h2 className="text-xl font-semibold">
            2. addDays()
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add a specific number of days to a date.
          </p>

          <input
            type="date"
            value={toInputDate(date)}
            onChange={(e) =>
              handleDateChange(e.target.value, setDate)
            }
            className="mt-4 rounded-md border px-3 py-2"
          />

          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="ml-3 w-24 rounded-md border px-3 py-2"
          />

          <div className="mt-5 rounded-md bg-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Result
            </p>

            <p className="mt-1 text-xl font-semibold">
              {format(addDays(date, days), "dd MMMM yyyy")}
            </p>
          </div>

          <div className="mt-4 rounded-md bg-gray-900 p-4 text-sm text-white">
            <code>
              addDays(date, {days})
            </code>
          </div>
        </section>

        {/* =========================
            3. SUB DAYS
        ========================= */}

        <section className="rounded-lg border bg-white p-6">
          <h2 className="text-xl font-semibold">
            3. subDays()
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Subtract days from a date.
          </p>

          <input
            type="date"
            value={toInputDate(date)}
            onChange={(e) =>
              handleDateChange(e.target.value, setDate)
            }
            className="mt-4 rounded-md border px-3 py-2"
          />

          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="ml-3 w-24 rounded-md border px-3 py-2"
          />

          <div className="mt-5 rounded-md bg-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Result
            </p>

            <p className="mt-1 text-xl font-semibold">
              {format(subDays(date, days), "dd MMMM yyyy")}
            </p>
          </div>

          <div className="mt-4 rounded-md bg-gray-900 p-4 text-sm text-white">
            <code>
              subDays(date, {days})
            </code>
          </div>
        </section>

        {/* =========================
            4. DIFFERENCE
        ========================= */}

        <section className="rounded-lg border bg-white p-6">
          <h2 className="text-xl font-semibold">
            4. differenceInDays()
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Calculate the number of days between two dates.
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-sm">
                Date 1
              </label>

              <input
                type="date"
                value={toInputDate(date1)}
                onChange={(e) =>
                  handleDateChange(
                    e.target.value,
                    setDate1
                  )
                }
                className="rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">
                Date 2
              </label>

              <input
                type="date"
                value={toInputDate(date2)}
                onChange={(e) =>
                  handleDateChange(
                    e.target.value,
                    setDate2
                  )
                }
                className="rounded-md border px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-5 rounded-md bg-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Difference
            </p>

            <p className="mt-1 text-xl font-semibold">
              {differenceInDays(date2, date1)} days
            </p>
          </div>

          <div className="mt-4 rounded-md bg-gray-900 p-4 text-sm text-white">
            <code>
              differenceInDays(date2, date1)
            </code>
          </div>
        </section>

        {/* =========================
            5. COMPARISON
        ========================= */}

        <section className="rounded-lg border bg-white p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold">
            5. Date Comparison
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Compare two dates using isBefore() and isAfter().
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <div>
              <label className="mb-1 block text-sm">
                Date 1
              </label>

              <input
                type="date"
                value={toInputDate(date1)}
                onChange={(e) =>
                  handleDateChange(
                    e.target.value,
                    setDate1
                  )
                }
                className="rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">
                Date 2
              </label>

              <input
                type="date"
                value={toInputDate(date2)}
                onChange={(e) =>
                  handleDateChange(
                    e.target.value,
                    setDate2
                  )
                }
                className="rounded-md border px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-5 rounded-md bg-gray-100 p-4">
            {isBefore(date1, date2) && (
              <p className="font-medium">
                Date 1 is before Date 2
              </p>
            )}

            {isAfter(date1, date2) && (
              <p className="font-medium">
                Date 1 is after Date 2
              </p>
            )}

            {!isBefore(date1, date2) &&
              !isAfter(date1, date2) && (
                <p className="font-medium">
                  Both dates are equal
                </p>
              )}
          </div>

          <div className="mt-4 rounded-md bg-gray-900 p-4 text-sm text-white">
            <code>
              isBefore(date1, date2)
              <br />
              isAfter(date1, date2)
            </code>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DateFnsPlayground;