"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", Borrowed: 2400, Returned: 1800 },
  { name: "Tue", Borrowed: 3000, Returned: 2000 },
  { name: "Wed", Borrowed: 4000, Returned: 3000 },
  { name: "Thu", Borrowed: 2800, Returned: 3500 },
  { name: "Fri", Borrowed: 3900, Returned: 4000 },
  { name: "Sat", Borrowed: 2600, Returned: 3000 },
  { name: "Sun", Borrowed: 3100, Returned: 2900 },
];

export default function CheckoutStatistics() {
  return (
    <div className=" bg-white p-4 rounded-md shadow-sm focus:outline-none">
      <h3 className="text-md font-semibold mb-4">Check-out statistics</h3>
      <ResponsiveContainer width="100%" height={250} >
        <LineChart data={data}>
          <CartesianGrid  vertical={false} />
          <XAxis
  dataKey="name"
  tick={{ fontWeight: 'bold', fontSize: 12, fill: '#333' }}
  axisLine={{ strokeWidth: 2 }}
/>
<YAxis
  tick={{ fontWeight: 'bold', fontSize: 12, fill: '#333' }}
  axisLine={{ strokeWidth: 2 }}
/>
          <Tooltip
           contentStyle={{
            width: '100px',
            height: '60px',
            fontSize: '12px',
            padding: '6px 8px',       
            lineHeight: '1.2',
            borderRadius:'10px'       
          }}
          labelStyle={{
            marginBottom: '4px',     
            fontSize: '13px',
          }}
          itemStyle={{
            margin: 0,               
            padding: 0,               
            fontSize: '11px',
            lineHeight: '1',
          }}
          />
          <Legend />
          <Line type="monotone" dataKey="Borrowed" stroke="#ef4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Returned" stroke="#22c55e" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
