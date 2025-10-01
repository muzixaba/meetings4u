import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  FileText,
  Users,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
  X,
  HelpCircle
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';

const SidePanel = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const {
    sidePanel,
    setSidePanelCollapsed,
    setSidePanelOpen,
    getUnreadNotificationsCount
  } = useUIStore();

  const unreadCount = getUnreadNotificationsCount();

  const handleLogout = () => {
    logout();
  };

  const getNavItems = () => {
    if (!user) return [];

    if (user.type === 'client') {
      return [
        { label: 'Dashboard', path: '/client/dashboard', icon: Home },
        { label: 'My Jobs', path: '/client/jobs', icon: FileText },
        { label: 'Entities', path: '/client/entities', icon: Users },
        { label: 'Messages', path: '/client/messages', icon: MessageSquare }
      ];
    }

    if (user.type === 'rep') {
      return [
        { label: 'Dashboard', path: '/rep/dashboard', icon: Home },
        { label: 'Browse Jobs', path: '/rep/jobs', icon: Calendar },
        { label: 'My Quotes', path: '/rep/quotes', icon: FileText },
        { label: 'Assignments', path: '/rep/assignments', icon: Users },
        { label: 'Messages', path: '/rep/messages', icon: MessageSquare },
        { label: 'Earnings', path: '/rep/earnings', icon: DollarSign }
      ];
    }

    return [];
  };

  const navItems = getNavItems();

  const closeSidePanel = () => {
    setSidePanelOpen(false);
  };

  if (!user) return null;

  return (
    <>
      {/* Overlay for mobile */}
      {sidePanel.open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidePanel}
        />
      )}

      {/* Side Panel */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        ${sidePanel.open ? 'translate-x-0' : '-translate-x-full'}
        ${sidePanel.collapsed ? 'w-16' : 'w-64'}
        ${sidePanel.open ? 'z-50' : 'z-10'}
        lg:translate-x-0
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={closeSidePanel}
            className="lg:hidden p-2"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Collapse toggle for desktop */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidePanelCollapsed(!sidePanel.collapsed)}
            className="hidden lg:flex p-2 ml-auto"
          >
            {sidePanel.collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar
              src={user.profile?.profilePhoto?.url}
              alt={user.profile?.name || user.email}
              size="sm"
              fallbackText={user.profile?.name || user.email}
            />
            {!sidePanel.collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.profile?.name || user.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user.type}
                </p>
              </div>
            )}
          </div>

          {/* Phone verification warning */}
          {!user.phone_verified && !sidePanel.collapsed && (
            <div className="mt-3">
              <Badge variant="warning" size="sm" className="w-full justify-center">
                Phone not verified
              </Badge>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      closeSidePanel();
                    }
                  }}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }
                    ${sidePanel.collapsed ? 'justify-center' : ''}
                  `}
                  title={sidePanel.collapsed ? item.label : undefined}
                >
                  <Icon className={`h-5 w-5 ${sidePanel.collapsed ? '' : 'mr-3'}`} />
                  {!sidePanel.collapsed && item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Notifications Section */}
        <div className="p-4 border-t border-gray-200">
          <button
            className={`
              flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors
              ${sidePanel.collapsed ? 'justify-center' : ''}
            `}
            title={sidePanel.collapsed ? 'Notifications' : undefined}
          >
            <div className="relative">
              <Bell className={`h-5 w-5 ${sidePanel.collapsed ? '' : 'mr-3'}`} />
              {unreadCount > 0 && (
                <Badge
                  variant="danger"
                  size="sm"
                  className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs min-w-[18px] h-[18px] flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </div>
            {!sidePanel.collapsed && (
              <span className="flex-1 text-left">Notifications</span>
            )}
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-1">
            <button
              className={`
                flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors
                ${sidePanel.collapsed ? 'justify-center' : ''}
              `}
              title={sidePanel.collapsed ? 'Help Center' : undefined}
            >
              <HelpCircle className={`h-5 w-5 ${sidePanel.collapsed ? '' : 'mr-3'}`} />
              {!sidePanel.collapsed && 'Help Center'}
            </button>

            <Link
              to={user.type === 'rep' ? '/rep/settings' : '#'}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  closeSidePanel();
                }
              }}
              className={`
                flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors
                ${sidePanel.collapsed ? 'justify-center' : ''}
              `}
              title={sidePanel.collapsed ? 'Settings' : undefined}
            >
              <Settings className={`h-5 w-5 ${sidePanel.collapsed ? '' : 'mr-3'}`} />
              {!sidePanel.collapsed && 'Settings'}
            </Link>

            <button
              onClick={handleLogout}
              className={`
                flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors
                ${sidePanel.collapsed ? 'justify-center' : ''}
              `}
              title={sidePanel.collapsed ? 'Logout' : undefined}
            >
              <LogOut className={`h-5 w-5 ${sidePanel.collapsed ? '' : 'mr-3'}`} />
              {!sidePanel.collapsed && 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;