import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/apiClient';

interface LoginFormData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authApi.login(formData);
      
      if (response.data.jwtToken) {
        localStorage.setItem('token', response.data.jwtToken);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        navigate('/home', { replace: true });
      } else {
        setError('Erreur lors de la connexion: pas de token reçu');
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || 
        'Erreur lors de la connexion. Veuillez réessayer.'
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="py-5 border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-serif">Mon Application</div>
              <a href="/register" className="text-sm text-gray-600 hover:text-gray-900">
                Créer un compte
              </a>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-md mx-auto py-12 px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif tracking-tight text-gray-900 sm:text-4xl">
              Bienvenue
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Connectez-vous pour continuer
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="vous@exemple.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Votre mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Besoin d'aide ?
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <a href="#" className="text-sm text-green-600 hover:text-green-500">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}; 