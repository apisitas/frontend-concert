// components/Layout.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { FaHome, FaHistory, FaUserAlt, FaSignOutAlt } from 'react-icons/fa'; // icons

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <div
                className="d-flex flex-column justify-content-between p-3"
                style={{
                    width: '250px',
                    backgroundColor: '#ffffff', // white background
                    borderRight: '1px solid #ddd',
                }}
            >
                <div>
                    {/* Sidebar Header */}
                    <div className="d-flex align-items-center mb-4">
                        {/* Invisible placeholder to align with icons */}
                        <span style={{ width: '1.25rem', display: 'inline-block' }}></span>
                        <h3 className="mb-0">Admin</h3>
                    </div>

                    {/* Menu Items */}
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link href="/admin" className="nav-link text-dark d-flex align-items-center">
                                <FaHome className="me-2" /> {/* Home icon */}
                                Home
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="/admin/concerts" className="nav-link text-dark d-flex align-items-center">
                                <FaHistory className="me-2" /> {/* History icon */}
                                History
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="/user" className="nav-link text-dark d-flex align-items-center">
                                <FaUserAlt className="me-2" /> {/* Switch to user icon */}
                                Switch To User
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
            <div className="flex-grow-1 p-4 bg-light">{children}</div>
        </div>
    );
};

export default Layout;
