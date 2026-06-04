'use client';

import React from 'react';
import { BottomNavigation } from './BottomNavigation';
import { TopNavigation } from './TopNavigation';
import './AppShell.css';

export interface AppShellProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  isLoading?: boolean;
}

export function AppShell({ 
  children, 
  showNavigation = true,
  isLoading = false 
}: AppShellProps) {
  return (
    <div className="app-shell" role="application">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay" aria-live="polite" aria-busy="true">
          <div className="loading-skeleton" />
        </div>
      )}
      
      {/* Top Navigation (Header) */}
      <TopNavigation />
      
      {/* Main Content Area */}
      <main id="main-content" className="main-content">
        {children}
      </main>
      
      {/* Bottom Navigation (Mobile) */}
      {showNavigation && <BottomNavigation />}
    </div>
  );
}

export default AppShell;
