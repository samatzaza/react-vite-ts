import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
    { name: "January", uv: 400, pv: 2400 },
    { name: "February", uv: 300, pv: 1398 },
    { name: "March", uv: 200, pv: 9800 },
    { name: "April", uv: 278, pv: 3908 },
];

const MyBarChart: React.FC = () => {
    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#8884d8" />
            <Bar dataKey="pv" fill="#82ca9d" />
        </BarChart>
    );
};

export default MyBarChart;
