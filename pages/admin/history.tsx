'use client';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Table, Card } from 'react-bootstrap';
import api from '@/services/api';

interface Reservation {
    id: number;
    user: { email: string };
    concert: { name: string };
    action: string;
    createdAt: string;
}

export default function History() {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const fetchReservations = async () => {
        try {
            const res = await api.get('/api/concerts/reservations'); // adjust endpoint
            setReservations(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <Layout>
            <h2>Reservation History</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Date time</th>
                        <th>Username</th>
                        <th>Concert name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length > 0 ? (
                        reservations.map((r, idx) => (
                            <tr key={r.id}>
                                <td>
                                    {new Date(r.createdAt).toLocaleDateString('en-GB')} {' '}
                                    {new Date(r.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    {/* Output: 25/10/2025 14:30 */}
                                </td>

                                <td>
                                    {r.user.email}
                                </td>
                                <td>
                                    {r.concert.name}
                                </td>
                                <td>{r.action.charAt(0).toUpperCase() + r.action.slice(1).toLowerCase()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center">
                                No reservations found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Layout>
    );
}
