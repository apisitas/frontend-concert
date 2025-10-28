'use client';
import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';

export default function ToastMessage() {
	const [show, setShow] = useState(false);
	const [message, setMessage] = useState('');
	const [variant, setVariant] = useState<'success' | 'danger' | 'info'>('success');

	const showToast = (msg: string, type: 'success' | 'danger' | 'info' = 'success') => {
		setMessage(msg);
		setVariant(type);
		setShow(true);
	};

	if (typeof window !== 'undefined') {
		(window as any).toast = {
			success: (msg: string) => showToast(msg, 'success'),
			error: (msg: string) => showToast(msg, 'danger'),
			info: (msg: string) => showToast(msg, 'info'),
		};
	}

	const getIcon = () => {
		switch (variant) {
			case 'success':
				return <FaCheckCircle className="me-2 text-white" size={18} />;
			case 'danger':
				return <FaExclamationCircle className="me-2 text-white" size={18} />;
			case 'info':
				return <FaInfoCircle className="me-2 text-white" size={18} />;
			default:
				return null;
		}
	};

	const bgColor =
		variant === 'success'
			? '#198754' // solid green
			: variant === 'danger'
				? '#dc3545' // solid red
				: '#0d6efd'; // solid blue

	return (
		<ToastContainer className="p-3" position="top-end">
			<Toast
				show={show}
				onClose={() => setShow(false)}
				delay={3000}
				autohide
				style={{
					backgroundColor: bgColor,
					borderLeft: `4px solid ${variant === 'success'
						? '#146c43'
						: variant === 'danger'
							? '#b02a37'
							: '#084298'
						}`,
					color: '#fff', // white text
					minWidth: '250px',
				}}
			>
				<Toast.Body className="d-flex align-items-center">
					{getIcon()}
					<span>{message}</span>
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
}
