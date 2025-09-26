import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, LogOut, Settings } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { notifications, getUnreadNotificationsCount } = useUIStore();

  const unreadCount = getUnreadNotificationsCount();

  const handleLogout = () => {
    logout();
  };

  const getNavItems = () => {
    if (!user) return [];

    if (user.type === 'client') {
      return [
        { label: 'Dashboard', path: '/client/dashboard' },
        { label: 'Post Job', path: '/client/post-job' },
        { label: 'My Jobs', path: '/client/jobs' },
        { label: 'Entities', path: '/client/entities' },
        { label: 'Messages', path: '/client/messages' }
      ];
    }

    if (user.type === 'rep') {
      return [
        { label: 'Dashboard', path: '/rep/dashboard' },
        { label: 'Browse Jobs', path: '/rep/jobs' },
        { label: 'My Quotes', path: '/rep/quotes' },
        { label: 'Assignments', path: '/rep/assignments' },
        { label: 'Earnings', path: '/rep/earnings' }
      ];
    }

    return [];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-primary-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
                M4U
              </div>
            </Link>
          </div>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-primary-600 rounded-lg">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge
                      variant="danger"
                      size="sm"
                      className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs min-w-[18px] h-[18px] flex items-center justify-center"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </button>

                {/* Phone verification warning */}
                {!user.phone_verified && (
                  <Badge variant="warning" size="sm">
                    Phone not verified
                  </Badge>
                )}

                {/* User menu */}
                <div className="flex items-center space-x-2">
                  <Avatar
                    src={user.profile?.profilePhoto?.url}
                    alt={user.profile?.name || user.email}
                    size="sm"
                    fallbackText={user.profile?.name || user.email}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.profile?.name || user.email}
                  </span>
                </div>

                {/* Settings & Logout */}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="p-2">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;