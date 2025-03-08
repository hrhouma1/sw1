import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ValidateAccount from '../components/ValidateAccount';

const Validate = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Validation de votre compte
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Entrez le code de vérification que vous avez reçu par email
          </p>
        </div>
        
        <ValidateAccount />
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Vous n'avez pas reçu de code ?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Réessayez de vous inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Validate; 