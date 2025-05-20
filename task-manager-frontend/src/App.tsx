import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import Task from './pages/Task';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>} 
        />
      <Route 
        path="/register" 
        element={
        <PublicRoute>
          <Register />
        </PublicRoute>} 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/add-task'
        element={
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        }
      />
      <Route
        path='/task/edit/:id'
        element={
          <ProtectedRoute>
            <EditTask />
          </ProtectedRoute>
        }
      />
      <Route 
        path='/task/:id'
        element={
          <ProtectedRoute>
            <Task />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;
