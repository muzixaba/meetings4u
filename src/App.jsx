import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import { useAuthStore } from './stores/authStore';

// Auth pages
import Landing from './pages/public/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import VerifyPhone from './pages/auth/VerifyPhone';

// Client pages
import ClientDashboard from './pages/client/Dashboard';
import PostJob from './pages/client/PostJob';
import ClientJobs from './pages/client/Jobs';
import JobDetails from './pages/client/JobDetails';
import ClientEntities from './pages/client/Entities';
import ClientMessages from './pages/client/Messages';

// Rep pages
import RepDashboard from './pages/rep/Dashboard';
import BrowseJobs from './pages/rep/BrowseJobs';
import RepQuotes from './pages/rep/Quotes';
import RepAssignments from './pages/rep/Assignments';
import RepMessages from './pages/rep/Messages';
import RepEarnings from './pages/rep/Earnings';
import RepProfile from './pages/rep/Profile';
import RepSettings from './pages/rep/Settings';

// Protected route component
const ProtectedRoute = ({ children, userType = null }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userType && user.type !== userType) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath = user.type === 'client' ? '/client/dashboard' : '/rep/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              isAuthenticated
                ? <Navigate to={user.type === 'client' ? '/client/dashboard' : '/rep/dashboard'} replace />
                : <Landing />
            }
          />

          {/* Auth routes */}
          <Route
            path="/login"
            element={
              isAuthenticated
                ? <Navigate to={user.type === 'client' ? '/client/dashboard' : '/rep/dashboard'} replace />
                : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated
                ? <Navigate to={user.type === 'client' ? '/client/dashboard' : '/rep/dashboard'} replace />
                : <Signup />
            }
          />
          <Route
            path="/verify-phone"
            element={
              <ProtectedRoute>
                <VerifyPhone />
              </ProtectedRoute>
            }
          />

          {/* Client routes */}
          <Route
            path="/client/dashboard"
            element={
              <ProtectedRoute userType="client">
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/post-job"
            element={
              <ProtectedRoute userType="client">
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/jobs"
            element={
              <ProtectedRoute userType="client">
                <ClientJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/jobs/:id"
            element={
              <ProtectedRoute userType="client">
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/entities"
            element={
              <ProtectedRoute userType="client">
                <ClientEntities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/messages"
            element={
              <ProtectedRoute userType="client">
                <ClientMessages />
              </ProtectedRoute>
            }
          />

          {/* Rep routes */}
          <Route
            path="/rep/dashboard"
            element={
              <ProtectedRoute userType="rep">
                <RepDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rep/jobs"
            element={
              <ProtectedRoute userType="rep">
                <BrowseJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rep/quotes"
            element={
              <ProtectedRoute userType="rep">
                <RepQuotes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rep/assignments"
            element={
              <ProtectedRoute userType="rep">
                <RepAssignments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rep/messages"
            element={
              <ProtectedRoute userType="rep">
                <RepMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rep/earnings"
            element={
              <ProtectedRoute userType="rep">
                <RepEarnings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rep/profile"
            element={
              <ProtectedRoute userType="rep">
                <RepProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rep/settings"
            element={
              <ProtectedRoute userType="rep">
                <RepSettings />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;