import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentForm from './pages/StudentForm';
import Materials from './pages/Materials';
import MaterialForm from './pages/MaterialForm';
import ForumList from './pages/ForumList';
import ForumTopic from './pages/ForumTopic';
import ForumCreate from './pages/ForumCreate';
import AdminUsers from './pages/AdminUsers';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/materials/new" element={<MaterialForm />} />
          <Route path="/forum" element={<ForumList />} />
          <Route path="/forum/new" element={<ForumCreate />} />
          <Route path="/forum/:id" element={<ForumTopic />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/student/new" element={<StudentForm />} />
          <Route path="/student/edit/:id" element={<StudentForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
