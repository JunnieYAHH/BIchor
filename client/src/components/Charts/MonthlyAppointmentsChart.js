import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';

const MonthlyAppointmentsLineChart = ({ appointments }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [eventError, setEventError] = useState('');

    useEffect(() => {
        getAllUsers();
    }, []);

    const token = localStorage.getItem('token');

    const getAllUsers = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/user/getAllUsers`, config);
            setUsers(data.data);
            setLoading(false);
        } catch (error) {
            setEventError(error.response.data.message);
        }
    }

    const appointmentsByMonth = appointments.reduce((acc, appointment) => {
        const date = new Date(appointment.createdAt);
        const month = date.toLocaleString('default', { month: 'long' }); 
        const year = date.getFullYear();
        const monthYear = `${month}/${year}`;
        if (!acc[monthYear]) {
            acc[monthYear] = { month: `${month}/${year}`, appointments: 0, donors: 0, recipients: 0 };
        }
        acc[monthYear].appointments++;
        
        const user = users.find(user => user._id === appointment.userID);
        if (user) {
            if (user.role === 'donor') {
                acc[monthYear].donors++;
            } else {
                acc[monthYear].recipients++;
            }
        }
        
        return acc;
    }, {});

    const data = Object.values(appointmentsByMonth).map(entry => ({
        month: entry.month,
        Appointments: entry.appointments,
        Donors: entry.donors,
        Recipients: entry.recipients
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Appointments" name="Appointments" stroke="#8884d8" />
                <Line type="monotone" dataKey="Donors" name="Donors" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Recipients" name="Recipients" stroke="#ff7300" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default MonthlyAppointmentsLineChart;
