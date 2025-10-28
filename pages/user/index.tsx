import Layout from '@/components/Layout';
import ConcertCard from '@/components/user/ConcertCard';
import React, { useState, useEffect } from 'react';
import api from '@/services/api';

export default function User() {
    const [concerts, setConcerts] = useState<any[]>([]);
    const [reservedConcerts, setReservedConcerts] = useState<any[]>([]);

    // For demo purposes, hardcode email (replace with login later)
    const userEmail = 'alice@example.com';

    // Fetch all concerts
    const fetchConcerts = async () => {
        try {
            const res = await api.get('/api/concerts');
            setConcerts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch all reservations by this user
    const fetchUserReservations = async () => {
        try {
            const res = await api.get(`/api/concerts/reservations/email/${userEmail}`);
            setReservedConcerts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Check if concert is reserved
    const isReserved = (concertId: string) =>
        reservedConcerts.some((r) => r.concert.id === concertId);

    const handleAction = async (concert: any, action: 'RESERVE' | 'CANCEL') => {
        try {
            await api.post(`/api/concerts/${concert.id}/reservations/action`, {
                email: userEmail,
                action,
            });

            // Update reservedConcerts state immediately
            setReservedConcerts((prev) => {
                if (action === 'RESERVE') {
                    return [...prev, { concert }]; // add reservation
                } else {
                    return prev.filter((r) => r.concert.id !== concert.id); // remove reservation
                }
            });
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };


    useEffect(() => {
        fetchConcerts();
        fetchUserReservations();
    }, []);

    return (
        <Layout>
            {concerts.map((concert) => (
                <ConcertCard
                    key={concert.id}
                    concert={concert}
                    isReserved={isReserved(concert.id)}
                    onReserve={(c) => handleAction(c, 'RESERVE')}
                    onCancel={(c) => handleAction(c, 'CANCEL')}
                />
            ))}
        </Layout>
    );
}
