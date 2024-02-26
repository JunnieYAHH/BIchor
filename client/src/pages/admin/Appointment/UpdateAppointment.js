import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateAppointment = () => {
    const [appointment, setAppointment] = useState(null);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');
    const { id } = useParams(); // Using useParams hook to get the id from URL

    useEffect(() => {
        const getSingleAppointment = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };

                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/appointment/getSingleAppointment/${id}`, config);
                setAppointment(data.appointment);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        getSingleAppointment();
    }, [token, id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!appointment) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Update Appointment</h2>
            <div>
                <p>Appointment Type: {appointment.appointmentType}</p>
                <p>Blood Group: {appointment.bloodGroup}</p>
                <p>Quantity: {appointment.quantity}</p>
                <p>Email: {appointment.email}</p>
                <p>Event: {appointment.event}</p>
                <p>Status: {appointment.status}</p>
                {/* Add other appointment details here */}
            </div>
        </div>
    );
}

export default UpdateAppointment;
