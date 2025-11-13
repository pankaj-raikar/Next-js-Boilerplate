'use client';
import React from 'react';
import { useSidebar } from '@/context/SidebarContext';

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      toggleMobileSidebar();
    }
  };

  if (!isMobileOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
      onClick={toggleMobileSidebar}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Close sidebar"
    />
  );
};

export default Backdrop;
