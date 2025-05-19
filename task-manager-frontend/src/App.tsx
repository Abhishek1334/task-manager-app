import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/edit-task/:id" element={<EditTask />} />
    </Routes>
  );
};

export default App;
