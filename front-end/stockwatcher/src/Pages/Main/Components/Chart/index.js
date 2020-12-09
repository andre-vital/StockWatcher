import React, { useEffect, useState } from "react";
import {
  LineChart,
  Tooltip,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
} from "recharts";
import "./styles.css";

const Chart = ({ data }) => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setNewData(
      data.map((entry) => ({
        ...entry,
        newUpdatedAt: new Date(entry.updatedAt).toLocaleTimeString(
          "UTC",
          "short"
        ),
      }))
    );
  }, [data]);

  return (
    <div style={{ height: 250 }}>
      <ResponsiveContainer width={700} height="99%">
        <LineChart
          width={730}
          height={250}
          data={newData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="newUpdatedAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
// Chart.handleOpen = handleOpen
export default Chart;
