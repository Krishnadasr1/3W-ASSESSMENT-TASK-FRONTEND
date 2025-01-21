import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from '../src/components/UserForm';
import AdminDashboard from '../src/components/AdminDashboard';
import './App.css';
import '../src/styles/styles.css'

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path='/' element={<UserForm />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
