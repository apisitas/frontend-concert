import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function ConcertList() {
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts`)
            .then(res => res.json())
            .then(setConcerts)
            .catch(console.error);
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Upcoming Concerts</h2>
            <Row>
                {concerts.map(concert => (
                    <Col key={concert.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{concert.name}</Card.Title>
                                <Card.Text>{concert.description}</Card.Text>
                                <Button href={`/concerts/${concert.id}`} variant="success">
                                    View & Reserve
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
