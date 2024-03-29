import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EventsStatusBarChart = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [eventError, setEventError] = useState('');

    useEffect(() => {
        getAllEvents();
    }, []);

    const getAllEvents = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/event/getAllEvents`, config);
            setEvents(data.data);
            setLoading(false);
        } catch (error) {
            setEventError(error.response.data.message);
        }
    };

    const countEventsByStatus = (eventType) => {
        const pendingCount = events.filter(event => event.eventType === eventType && event.status === 'pending').length;
        const completedCount = events.filter(event => event.eventType === eventType && event.status === 'completed').length;
        return { eventType, pendingCount, completedCount };
    };

    const eventData = ['campaign', 'donation', 'transfusion'].map(eventType => countEventsByStatus(eventType));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={eventData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="eventType" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pendingCount" stackId="status" fill="#ff2643" name="Pending" />
                <Bar dataKey="completedCount" stackId="status" fill="#62f562" name="Completed" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default EventsStatusBarChart;
