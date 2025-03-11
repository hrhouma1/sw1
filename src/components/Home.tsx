import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (e) {
        console.error('Erreur lors du parsing des données utilisateur:', e);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-serif">Mon Application</div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {user.firstName || user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                Déconnexion
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <div className="px-4 py-2 text-sm text-gray-700">
              {user.firstName || user.email}
            </div>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="border-b border-gray-200 pb-5">
            <h1 className="text-4xl font-serif text-gray-900">
              Tableau de bord
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Bienvenue sur votre espace personnel
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {/* Informations utilisateur */}
            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-6">
                Informations du compte
              </h2>
              <div className="bg-white overflow-hidden">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div className="py-4">
                    <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.firstName && user.lastName 
                        ? `${user.firstName} ${user.lastName}`
                        : 'Non renseigné'}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Statistiques */}
            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-6">
                Aperçu
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-gray-200 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Statut</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">Actif</dd>
                </div>

                <div className="bg-white p-6 border border-gray-200 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Type de compte</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">Standard</dd>
                </div>

                <div className="bg-white p-6 border border-gray-200 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Dernière connexion</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date().toLocaleDateString()}</dd>
                </div>
              </div>
            </section>

            {/* Activité récente */}
            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-6">
                Activité récente
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Connexion réussie</p>
                      <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}; 