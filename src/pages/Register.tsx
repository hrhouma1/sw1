import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/apiClient';

interface RegisterFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authApi.register(formData);
      if (response.data) {
        navigate('/login', { replace: true });
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || 
        'Erreur lors de l\'inscription. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-serif tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Pensées<span className="text-indigo-600">.</span>
              </div>
            </Link>
            <div className="flex items-center">
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                Déjà membre ? <span className="text-indigo-600">Se connecter</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-indigo-100 rounded-full filter blur-2xl opacity-30"></div>
              <h2 className="text-4xl font-serif tracking-tight text-gray-900 mb-4 relative">
                Rejoignez la communauté
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Partagez vos idées et connectez-vous avec des esprits créatifs.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-xl border border-gray-100 rounded-2xl p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                <div className="relative group">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-indigo-300 sm:text-sm"
                  />
                </div>

                <div className="relative group">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-indigo-300 sm:text-sm"
                  />
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-indigo-300 sm:text-sm"
                  placeholder="vous@exemple.com"
                />
              </div>

              <div className="relative group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-indigo-300 sm:text-sm"
                  placeholder="8 caractères minimum"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Minimum 8 caractères, avec au moins une majuscule et un chiffre
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Inscription en cours...
                    </>
                  ) : (
                    'Créer mon compte'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    En vous inscrivant, vous acceptez
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                <Link to="#" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                  les conditions d'utilisation
                </Link>
                {' et '}
                <Link to="#" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                  la politique de confidentialité
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register; 