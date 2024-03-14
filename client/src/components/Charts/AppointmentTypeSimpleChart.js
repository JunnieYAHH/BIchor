import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';

const AppointmentTypeSimpleChart = ({ appointments }) => {

    const appointmentTypeMap = {
        'out': 'Donate',
        'in': 'Transfuse',
        'apply': 'Campaign'
    };

    const appointmentTypes = appointments.reduce((types, appointment) => {
        const type = appointmentTypeMap[appointment.appointmentType];
        types[type] = (types[type] || 0) + 1;
        return types;
    }, {});

    const data = Object.keys(appointmentTypes).map(type => ({
        name: type,
        value: appointmentTypes[type]
    }));

    return (
        <ResponsiveContainer height={400}>
            <PieChart>
                <Legend/>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={100} 
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#07b807', '#f57631', '#ff2643', '#FF8042'][index % 4]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default AppointmentTypeSimpleChart;
