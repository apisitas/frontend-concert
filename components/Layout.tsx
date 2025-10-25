// components/Layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { FaHome, FaHistory, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="d-flex" style={{ minHeight: '100vh', overflow: 'hidden' }}>
            {/* Sidebar */}
            <div
                className="d-flex flex-column justify-content-between p-3"
                style={{
                    width: '250px',
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid #ddd',
                    flexShrink: 0, // prevent shrinking
                }}
            >
                <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 80px)' }}>
                    {/* Sidebar Header */}
                    <div className="d-flex align-items-center mb-4">
                        <span style={{ width: '1.25rem', display: 'inline-block' }}></span>
                        <h3 className="mb-0">Admin</h3>
                    </div>

                    {/* Menu Items */}
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link href="/" className="nav-link text-dark d-flex align-items-center">
                                <FaHome className="me-2" /> Home
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="/admin/history" className="nav-link text-dark d-flex align-items-center">
                                <FaHistory className="me-2" /> History
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="/user" className="nav-link text-dark d-flex align-items-center">
                                <FaUserAlt className="me-2" /> Switch To User
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Logout Button at bottom */}
                <div className="mt-4">
                    <Button
                        variant="outline-danger"
                        className="w-100 d-flex align-items-center justify-content-center"
                        onClick={() => {
                            alert('Logged out!');
                        }}
                    >
                        <FaSignOutAlt className="me-2" /> Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div
                className="flex-grow-1 bg-light p-4"
                style={{
                    overflowY: 'auto', // scrollable content
                    height: '100vh',
                }}
            >
                {children}
            </div>
        </div>
    );
}
