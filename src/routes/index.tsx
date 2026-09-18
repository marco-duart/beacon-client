import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '@/pages/dashboard-page';
import { IssueDetailPage } from '@/pages/issue-detail-page';
import { IssuesPage } from '@/pages/issues-page';
import { LoginPage } from '@/pages/login-page';
import { SystemsPage } from '@/pages/systems-page';
import { UsersPage } from '@/pages/users-page';
import { ProtectedRoute } from './protected-route';
import { RequireRole } from './require-role';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/systems" element={<SystemsPage />} />
          <Route path="/issues" element={<IssuesPage />} />
          <Route path="/issues/:id" element={<IssueDetailPage />} />
          <Route element={<RequireRole roles={['admin']} />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
