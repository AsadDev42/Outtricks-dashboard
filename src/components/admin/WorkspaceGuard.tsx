import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AccessDenied } from './AdminAccessDenied';

export const WorkspaceGuard: React.FC = () => {
  const { user } = useAuth();

  // Proper role & ownership check:
  const isWorkspaceAdmin = Boolean(
    user?.role === 'owner' ||
    user?.role === 'admin' ||
    user?.role === 'workspace_admin' ||
    user?.role === 'super_admin' ||
    user?.isWorkspaceOwner ||
    user?.permissions?.includes('workspace:admin') ||
    user?.permissions?.includes('admin:access')
  );

  if (!isWorkspaceAdmin) {
    return <AccessDenied />;
  }

  return <Outlet />;
};

export default WorkspaceGuard;
