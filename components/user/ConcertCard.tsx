import { Card, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import React from 'react';

interface Concert {
  id: string | number;
  name: string;
  description: string;
  totalSeats: number;
  isReserved?: boolean; // <-- true if user already reserved
}

interface ConcertCardUserProps {
  concert: Concert;
  isReserved: boolean;
  onReserve: (concert: Concert) => void;
  onCancel: (concert: Concert) => void;
}

export default function ConcertCardUser({ concert, isReserved, onReserve, onCancel }: ConcertCardUserProps) {
  return (
    <Card key={concert.id} className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>{concert.name}</Card.Title>
        <Card.Text>{concert.description}</Card.Text>

        <div className="d-flex align-items-center justify-content-between mt-3">
          <div className="d-flex align-items-center">
            <FaUser className="me-1 text-primary" />
            <span>{concert.totalSeats}</span>
          </div>

          {isReserved ? (
            <Button variant="danger" size="sm" onClick={() => onCancel(concert)}>
              Cancel
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => onReserve(concert)}>
              Reserve
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

