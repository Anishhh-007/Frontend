import React from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';


const LineGraph = () => {

  // Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { count, totalRevenue } = payload[0].payload;
    return (
      <div className='text-zinc-700' style={{ backgroundColor: "#fff", padding: 10, border: "1px solid #ccc" }}>
        <p><strong>Time:</strong> {label}</p>
        <p><strong>Order Count:</strong> {count}</p>
        <p><strong>Total Revenue:</strong> Rs. {totalRevenue}</p>
      </div>
    );
  }

  return null;
};

  const data = useSelector((store) => store.analytics);
  console.log('selector', data);

 if (!Array.isArray(data) || data.length === 0) {
  return <p className='pt-10'>Looks like there are no orders today so far.</p>;
}

  return (
    <LineChart
      width={1000}
      height={600}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />

      {/* Y-axis value: count */}
      <Line
        type="monotone"
        dataKey="count"
        stroke="purple"
        strokeWidth={2}
        name="Order Count"
      />

      {/* X-axis value: time interval */}
      <XAxis
        label={{
          value: 'Time Interval',
          position: 'insideBottom',
          offset: -5
        }}
        dataKey="interval"
      />

      <YAxis
        label={{
          value: 'Order Count',
          position: 'insideLeft',
          angle: -90
        }}
      />

      <Legend align="right" />

      {/* Show custom tooltip */}
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  );
};

export default LineGraph;
