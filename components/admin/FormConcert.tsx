'use client';
import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import axios from 'axios';

export default function FormConcert() {
    const [newConcert, setNewConcert] = useState({
        name: '',
        description: '',
        seats: '',
    });

    // Create new concert
    const handleCreate = async () => {
        try {
            await axios.post('/api/concerts', {
                name: newConcert.name,
                description: newConcert.description,
                totalSeats: Number(newConcert.seats),
            });
            setNewConcert({ name: '', description: '', seats: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
            }}
        >
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Concert Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newConcert.name}
                            onChange={(e) =>
                                setNewConcert({ ...newConcert, name: e.target.value })
                            }
                            placeholder="Please input concert name"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Total Seats</Form.Label>
                        <Form.Control
                            type="number"
                            value={newConcert.seats}
                            onChange={(e) =>
                                setNewConcert({ ...newConcert, seats: e.target.value })
                            }
                            placeholder="Please input total seats"
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    value={newConcert.description}
                    onChange={(e) =>
                        setNewConcert({ ...newConcert, description: e.target.value })
                    }
                    placeholder="Please input description"
                />
            </Form.Group>

            <Button type="submit" variant="primary" className="d-flex align-items-center">
                <FaSave className="me-2" /> {/* margin to the right of the icon */}
                Save
            </Button>
        </Form>
    );
}
