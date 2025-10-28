'use client';
import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import api from '@/services/api';

interface FormConcertProps {
    onCreated?: () => void; // refresh list
    onSwitchTab?: (key: string) => void; // switch tab
}

interface ServerError {
    name?: string;
    description?: string;
    totalSeats?: string;
}

export default function FormConcert({ onCreated, onSwitchTab }: FormConcertProps) {
    const [newConcert, setNewConcert] = useState({
        name: '',
        description: '',
        seats: '',
    });

    const [errors, setErrors] = useState<ServerError>({});

    const handleCreate = async () => {
        try {
            setErrors({}); // clear previous errors

            const res = await api.post('/api/concerts', {
                name: newConcert.name,
                description: newConcert.description,
                totalSeats: Number(newConcert.seats),
            });

            // Reset form
            setNewConcert({ name: '', description: '', seats: '' });

            // Refresh parent list
            if (onCreated) onCreated();

            // Switch to overview/list tab
            if (onSwitchTab) onSwitchTab('list');

            (window as any).toast?.success('Created successfully');
        } catch (error: any) {
            if (error.response?.data?.message) {
                const serverErrors: ServerError = {};
                error.response.data.message.forEach((msg: string) => {
                    if (msg.toLowerCase().includes('name')) serverErrors.name = msg;
                    if (msg.toLowerCase().includes('description')) serverErrors.description = msg;
                    if (msg.toLowerCase().includes('seat')) serverErrors.totalSeats = msg;
                });
                setErrors(serverErrors);
            } else {
                console.error(error);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate();
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group controlId="concertName">
                        <Form.Label>Concert Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newConcert.name}
                            onChange={(e) => setNewConcert({ ...newConcert, name: e.target.value })}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="totalSeats">
                        <Form.Label>Total Seats</Form.Label>
                        <Form.Control
                            type="number"
                            value={newConcert.seats}
                            onChange={(e) => setNewConcert({ ...newConcert, seats: e.target.value })}
                            isInvalid={!!errors.totalSeats}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.totalSeats}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={newConcert.description}
                    onChange={(e) => setNewConcert({ ...newConcert, description: e.target.value })}
                    isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary" className="d-flex align-items-center">
                    <FaSave className="me-2" /> Save
                </Button>
            </div>
        </Form>
    );
}
