import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const RecipientGenderPieChart = ({ genderRecipientCounts }) => {
    const data = Object.keys(genderRecipientCounts).map(gender => ({
        name: gender,
        value: genderRecipientCounts[gender]
    }));

    const COLORS = ['#3d4aff', '#ff2643'];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={true}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
            <Tooltip formatter={(value) => `${value}`} />
        </ResponsiveContainer>
    )
}

export default RecipientGenderPieChart
