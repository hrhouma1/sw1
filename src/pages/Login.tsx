import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              créez un nouveau compte
            </Link>
          </p>
        </div>
        
        <LoginForm />
        
        <div className="text-center mt-6">
          <Link to="/validate" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Vous avez reçu un code de validation ? Cliquez ici pour valider votre compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 