import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip as ChartJSTooltip,
  Legend as ChartJSLegend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartJSTooltip,
  ChartJSLegend
);

function Task89() {
  const data = [
    { name: "2017", react: 32, angular: 37, vue: 60 },
    { name: "2018", react: 42, angular: 42, vue: 54 },
    { name: "2019", react: 51, angular: 41, vue: 54 },
    { name: "2020", react: 60, angular: 37, vue: 28 },
    { name: "2021", react: 51, angular: 31, vue: 27 },
    { name: "2022", react: 95, angular: 44, vue: 49 },
  ];

  const dataBar = {
    labels: ["2017", "2018", "2019", "2020", "2021", "2022"],

    datasets: [
      {
        label: "React",
        data: [32, 42, 51, 60, 51, 95],
        backgroundColor: "#61DAFB",
      },
      {
        label: "Angular",
        data: [37, 42, 41, 37, 31, 44],
        backgroundColor: "#DD0031",
      },
      {
        label: "Vue",
        data: [60, 54, 54, 28, 27, 49],
        backgroundColor: "#42B883",
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* Recharts */}

      <section>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Recharts
        </h1>

        <p className="mb-6 text-gray-600">
          Line chart using Recharts.
        </p>

        <div className="h-[450px] rounded-xl border bg-white p-6 shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="react"
                stroke="#61dafb"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="angular"
                stroke="#dd0031"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="vue"
                stroke="#42b883"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>


      {/* react-chartjs-2 */}

      <section>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          react-chartjs-2
        </h1>

        <p className="mb-6 text-gray-600">
          Bar chart using Chart.js through react-chartjs-2.
        </p>

        <div className="h-[450px] rounded-xl border bg-white p-6 shadow-sm">
          <Bar data={dataBar} />
        </div>
      </section>

    </div>
  );
}

export default Task89;