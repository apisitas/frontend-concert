import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Row, Col, Card } from 'react-bootstrap';
import Layout from '../components/Layout';
import { FaChair, FaTicketAlt, FaTimesCircle } from 'react-icons/fa';
import FormConcert from '../components/admin/FormConcert';
import api from "../services/api";
import ConfirmModal from '../components/ConfirmModal';
import ConcertCard from '../components/admin/ConcertCard';

export default function ManageConcerts() {
    const [key, setKey] = useState('list'); // active tab
    const [concerts, setConcerts] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedConcert, setSelectedConcert] = useState(null);
    const [totalSeats, setTotalSeats] = useState(0);
    const [totalReserve, setTotalReserve] = useState(0);
    const [totalCancel, setTotalCancel] = useState(0);

    // Fetch concerts from backend
    const fetchConcerts = async () => {
        try {
            const res = await api.get('/api/concerts'); // adjust endpoint
            setConcerts(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const fetchStats = async () => {
        try {
            const res = await api.get('/api/concerts/stats'); // adjust endpoint
            setTotalSeats(res.data.totalSeats);
            setTotalReserve(res.data.totalReserve);
            setTotalCancel(res.data.totalCancel);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchConcerts();
        fetchStats();
    }, []);

    // Handle delete modal open
    const handleDeleteClick = (concert) => {
        setSelectedConcert(concert);
        setShowConfirm(true);
    };

    return (
        <Layout>
            {/* Stats Cards */}
            <Row className="my-4">
                {[
                    { icon: <FaChair size={30} />, label: 'Total Seats', value: totalSeats },
                    { icon: <FaTicketAlt size={30} />, label: 'Reserved', value: totalReserve },
                    { icon: <FaTimesCircle size={30} />, label: 'Cancelled', value: totalCancel },
                ].map((stat, idx) => (
                    <Col key={idx} md={4} className="mb-3">
                        <Card className="shadow-sm">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <div className="mb-2 text-primary">{stat.icon}</div>
                                <Card.Title>{stat.label}</Card.Title>
                                <Card.Text className="display-6">{stat.value}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Tabs */}
            <Tabs activeKey={key} onSelect={(k) => setKey(k || 'list')} className="mb-3">
                {/* Concert List */}
                <Tab eventKey="list" title="Overview">
                    <div className="my-4">
                        {concerts.map((concert) => (
                            <ConcertCard
                                key={concert.id}
                                concert={concert}
                                onDelete={handleDeleteClick} // pass handler
                            />
                        ))}
                    </div>
                </Tab>

                {/* Create Concert */}
                <Tab eventKey="create" title="Create">
                    <FormConcert
                        onCreated={fetchConcerts} // refresh list
                        onSwitchTab={setKey}      // switch tab to 'list'
                    />
                </Tab>
            </Tabs>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showConfirm}
                concertId={selectedConcert?.id}
                concertName={selectedConcert?.name}
                onClose={() => setShowConfirm(false)}
                onDeleted={fetchConcerts} // refresh list after delete
            />
        </Layout>
    );
}
