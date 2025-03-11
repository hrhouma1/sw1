import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Login } from './components/auth/Login';
import { Home } from './components/Home';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import Validate from './pages/Validate';
import Dashboard from './pages/Dashboard';

function App() {
  // Fonction pour vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log('Vérification auth:', token ? 'Token présent' : 'Pas de token');
    return !!token;
  };

  // Composant pour protéger les routes
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    console.log('Vérification route privée');
    return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={
            isAuthenticated() ? <Navigate to="/home" replace /> : <Login />
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/validate" element={<Validate />} />
          
          {/* Routes protégées */}
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={<ProtectedRoute />} />
          
          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
