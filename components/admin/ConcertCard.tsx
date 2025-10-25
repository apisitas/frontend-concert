import { Card, Button } from 'react-bootstrap';
import { FaUser, FaTrash } from 'react-icons/fa';
import React from 'react';

interface Concert {
  id: string | number;
  name: string;
  description: string;
  totalSeats: number;
}

interface ConcertCardProps {
  concert: Concert;
  onDelete: (concert: Concert) => void; // callback to open modal
}

export default function ConcertCard({ concert, onDelete }: ConcertCardProps) {
  return (
    <Card key={concert.id} className="shadow-sm mb-3">
      <Card.Body>
        {/* Name and Description */}
        <Card.Title>{concert.name}</Card.Title>
        <Card.Text>{concert.description}</Card.Text>

        {/* Seats and Delete Button */}
        <div className="d-flex align-items-center justify-content-between mt-3">
          <div className="d-flex align-items-center">
            <FaUser className="me-1 text-primary" />
            <span>{concert.totalSeats}</span>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(concert)}
            className="d-flex align-items-center"
          >
            <FaTrash className="me-2" />
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
