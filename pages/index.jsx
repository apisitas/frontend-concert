import Link from 'next/link';
import { Container, Button } from 'react-bootstrap';

export default function HomePage() {
    return (
        <Container className="text-center mt-5">
            <h1 className="mb-3">🎵 Free Concert Tickets</h1>
            <p>Reserve your seat for upcoming concerts!</p>
            <Link href="/concerts">
                <Button variant="primary">View Concerts</Button>
            </Link>
        </Container>
    );
}
