import { Routes, Route, Navigate } from 'react-router-dom';
import BigScreen from './pages/BigScreen.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import MobilePage from './pages/MobilePage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BigScreen />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/mobile" element={<MobilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
