import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../context/AuthContext';
import { LoadingState } from '../ui/LoadingState';

export interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, isLoading, currentWorkspace } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingState message="Verifying session and workspace permissions..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve intended destination path for redirect
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  // If requiredRole is specified, check workspace role hierarchy: owner > admin > member > viewer
  if (requiredRole && currentWorkspace) {
    const roleHierarchy: Record<UserRole, number> = {
      owner: 4,
      admin: 3,
      member: 2,
      viewer: 1,
    };

    const userLevel = roleHierarchy[currentWorkspace.role] || 1;
    const requiredLevel = roleHierarchy[requiredRole] || 1;

    if (userLevel < requiredLevel) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-white dark:bg-[#161616] border border-amber-200 dark:border-amber-900/60 shadow-xl space-y-4">
            <div className="text-2xl">🔒</div>
            <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
              Access Restricted
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You need <strong>{requiredRole}</strong> permissions in workspace{' '}
              <strong>{currentWorkspace.name}</strong> to view this module.
            </p>
          </div>
        </div>
      );
    }
  }

  return children;
};
