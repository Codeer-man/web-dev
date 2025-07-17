// Chart.jsx or Chart.tsx

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// ✅ Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Chart() {
  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center max-w-7xl flex-auto overflow-hidden">
      <div className="border h-full w-full border-gray-300 shadow-lg rounded-md">
        <label className="p-3">chart 1</label>
      </div>

      <div className="flex gap-3 items-center justify-evenly w-full h-full">
        <div className="w-full h-full border border-gray-300 shadow-lg rounded-md p-4">
          <label className="p-3 block">chart 2: Bar Chart</label>
          <Bar
            data={{
              labels: ["Money", "Sleep", "Hasayo"],
              datasets: [
                {
                  label: "Daily Stats",
                  data: [8, 6, 5],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)"
                  ],
                  borderRadius: 6,
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Activity Overview" }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>

        <div className="w-full h-full border border-gray-300 shadow-lg rounded-md">
          <label className="p-3">chart 3</label>
        </div>
      </div>
    </div>
  );
}
