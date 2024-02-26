"use client";

import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    visit: 60,
    duration: 90,
  },
  {
    name: "Mon",
    visit: 120,
    duration: 259,
  },
  {
    name: "Tue",
    visit: 150,
    duration: 380,
  },
  {
    name: "Wed",
    visit: 178,
    duration: 390,
  },
  {
    name: "Thu",
    visit: 189,
    duration: 480,
  },
  {
    name: "Fri",
    visit: 130,
    duration: 280,
  },
  {
    name: "Sat",
    visit: 80,
    duration: 140,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Activity</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="#8b85ff"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="duration"
            stroke="lime"
            strokeDasharray="3 4 4 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
