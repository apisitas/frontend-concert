import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';

export default function ConcertDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [concert, setConcert] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts/${id}`)
            .then(res => res.json())
            .then(setConcert)
            .catch(console.error);
    }, [id]);

    async function handleReserve() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts/${id}/reserve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'demo-user' }),
        });
        const data = await res.json();
        setMessage(data.message || (res.ok ? 'Reservation successful!' : 'Error reserving seat.'));
    }

    if (!concert) return <p>Loading...</p>;

    return (
        <Container className="mt-5">
            <h3>{concert.name}</h3>
            <p>{concert.description}</p>
            {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}
            <Button variant="primary" onClick={handleReserve}>Reserve Seat</Button>
        </Container>
    );
}
