import Link from 'next/link';
import { ListGroup, Button } from 'react-bootstrap';
import { FaHome, FaInbox, FaExchangeAlt, FaSignOutAlt } from 'react-icons/fa';

interface SidebarContentProps {
    role: 'admin' | 'user';
    switchRole: () => void;
    onLinkClick?: () => void;
}

export default function SidebarContent({ role, switchRole, onLinkClick }: SidebarContentProps) {
    return (
        <div className="d-flex flex-column justify-content-between h-100">
            {/* Top Menu */}
            <div>
                <h5 className="fw-bold mb-4">{role === 'admin' ? 'Admin' : 'User'}</h5>
                <ListGroup variant="flush">
                    {role === 'admin' && (
                        <>
                            <ListGroup.Item
                                action
                                as={Link}
                                href="/"
                                className="sidebar-item d-flex align-items-center"
                                onClick={onLinkClick}
                            >
                                <FaHome className="me-2" /> Home
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                as={Link}
                                href="/admin/history"
                                className="sidebar-item d-flex align-items-center"
                                onClick={onLinkClick}
                            >
                                <FaInbox className="me-2" /> History
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                as="button"
                                onClick={switchRole}
                                className="sidebar-item d-flex align-items-center"
                            >
                                <FaExchangeAlt className="me-2" /> Switch to User
                            </ListGroup.Item>
                        </>
                    )}
                    {role === 'user' && (
                        <ListGroup.Item
                            action
                            as="button"
                            onClick={switchRole}
                            className="sidebar-item d-flex align-items-center"
                        >
                            <FaExchangeAlt className="me-2" /> Switch to Admin
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>

            {/* Bottom Logout */}
<div className="mt-3 text-center">
  <div
    className="d-flex align-items-center justify-content-left text-secondary logout-text"
    role="button"
    onClick={() => alert('Logged out!')}
  >
    <FaSignOutAlt className="me-2" /> Logout
  </div>
</div>

        </div>
    );
}
