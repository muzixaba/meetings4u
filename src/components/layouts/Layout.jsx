import React, { useEffect } from 'react';
import Header from './Header';
import SidePanel from './SidePanel';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';

const Layout = ({ children }) => {
  const { user } = useAuthStore();
  const { sidePanel, setSidePanelOpen } = useUIStore();

  // Close side panel on window resize to prevent layout issues
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && sidePanel.open) {
        setSidePanelOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidePanel.open, setSidePanelOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Side Panel */}
      {user && <SidePanel />}

      {/* Header spans full width */}
      <Header />

      {/* Main Content Area with left margin for side panel and top padding for fixed header */}
      <main className={`
        pt-16 px-4 sm:px-6 lg:px-8 py-8 min-h-screen transition-all duration-300 ease-in-out
        ${user && sidePanel.collapsed ? 'lg:ml-16' : user ? 'lg:ml-64' : ''}
        ${user ? 'max-w-none' : 'max-w-7xl mx-auto'}
      `}>
        {children}
      </main>
    </div>
  );
};

export default Layout;