'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Offcanvas } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ToastMessage from '@/components/ToastMessage';
import SidebarContent from '@/components/SidebarContent';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const [role, setRole] = useState<'admin' | 'user'>('admin');
	const [showSidebar, setShowSidebar] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const storedRole = localStorage.getItem('role') as 'admin' | 'user' | null;
		if (storedRole) setRole(storedRole);
	}, []);

	const switchRole = () => {
		if (role === 'admin') {
			localStorage.setItem('role', 'user');
			setRole('user');
			router.push('/user');
		} else {
			localStorage.setItem('role', 'admin');
			setRole('admin');
			router.push('/');
		}
	};

	const toggleSidebar = () => setShowSidebar(!showSidebar);

	return (
		<div className="d-flex min-vh-100 flex-column flex-md-row">
			{/* Mobile hamburger */}
			<Button
				variant="primary"
				className="d-md-none m-2"
				onClick={toggleSidebar}
			>
				<FaBars /> Menu
			</Button>

			{/* Desktop sticky sidebar */}
			<div
				className="d-none d-md-flex flex-column justify-content-between bg-white p-4 position-sticky top-0"
				style={{
					width: '280px',        // fixed width
					flexShrink: 0,         // prevents it from shrinking
					height: '100vh',       // full viewport height
					borderRight: '1px solid #ddd',
				}}
			>
				<SidebarContent role={role} switchRole={switchRole} />
			</div>

			{/* Mobile Offcanvas sidebar */}
			<Offcanvas show={showSidebar} onHide={toggleSidebar} className="d-md-none">
				{/* <Offcanvas.Header closeButton>
					<Offcanvas.Title>{role === 'admin' ? 'Admin' : 'User'}</Offcanvas.Title>
				</Offcanvas.Header> */}
				<Offcanvas.Body>
					<SidebarContent role={role} switchRole={switchRole} onLinkClick={toggleSidebar} />
				</Offcanvas.Body>
			</Offcanvas>

			{/* Main content */}
			<div className="flex-grow-1 bg-light p-3" style={{ overflowY: 'auto' }}>
				{children}
			</div>

			{/* Toast */}
			<ToastMessage />
		</div>
	);
}
