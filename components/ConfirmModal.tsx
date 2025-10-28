import { Modal, Button, Row, Col } from 'react-bootstrap';
import api from '../services/api';
import { useState } from 'react';
interface ConfirmModalProps {
	show: boolean;
	concertId: string | number;
	concertName?: string;
	onClose: () => void;
	onDeleted?: () => void;
}

export default function ConfirmModal({
	show,
	concertId,
	concertName,
	onClose,
	onDeleted,
}: ConfirmModalProps) {
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		setLoading(true);
		try {
			await api.delete(`/api/concerts/${concertId}`);
			if (onDeleted) onDeleted();
			(window as any).toast.success('Delete successfully');
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			onClose();
		}
	};

	return (
		<Modal
			show={show}
			onHide={onClose}
			centered
			size="sm"
			backdrop="static"
			keyboard={false}
			className="p-0"
		>
			{/* Header with centered red X */}
			<Modal.Header className="justify-content-center border-0 p-2">
				<Button
					variant="danger"
					className="rounded-circle p-0 d-flex align-items-center justify-content-center"
					style={{ width: '40px', height: '40px', fontSize: '20px' }}
					onClick={onClose}
				>
					×
				</Button>
			</Modal.Header>

			{/* Body */}
			<Modal.Body className="text-center py-3 px-2">
				<strong>Are you sure to delete <br />"{concertName}"?</strong>
			</Modal.Body>

			{/* Footer with two buttons same row */}
			<Modal.Footer className="border-0 p-2">
				<Row className="w-100 mx-0">
					<Col xs={6} className="px-1">
						<Button
							variant="light"          // white background
							className="w-100 border" // keep border visible
							onClick={onClose}
						>
							Cancel
						</Button>
					</Col>
					<Col xs={6} className="px-1">
						<Button
							variant="danger"
							className="w-100"
							onClick={handleDelete}
							disabled={loading}
						>
							Yes, Delete
						</Button>
					</Col>
				</Row>
			</Modal.Footer>
		</Modal>
	);
}
