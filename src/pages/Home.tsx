import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-serif tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Pensées<span className="text-indigo-600">.</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Se connecter
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-2 border-2 border-indigo-600 text-sm font-medium rounded-lg text-indigo-600 bg-transparent hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-indigo-100 rounded-full filter blur-3xl opacity-30"></div>
            <h1 className="text-6xl sm:text-7xl font-serif tracking-tight text-gray-900 mb-8 leading-tight relative">
              Partagez vos <span className="relative">idées<span className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-200"></span></span> avec le monde
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Une plateforme unique où chaque voix compte, où chaque histoire mérite d'être racontée.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Commencer à écrire
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif mb-12 text-center relative inline-block">
            <span className="relative z-10">Découvertes du moment</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-100"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Featured Card 1 */}
            <article className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 overflow-hidden p-0.5">
                    <img src="https://source.unsplash.com/random/100x100?face-1" alt="" className="h-full w-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">12 Dec · 5 min</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                L'art de l'innovation consciente
              </h3>
              <p className="text-gray-600 line-clamp-3 text-base leading-relaxed mb-4">
                Explorer les nouvelles frontières de la créativité tout en restant fidèle à ses valeurs...
              </p>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700">
                  Innovation
                </span>
                <span className="text-xs text-indigo-400">
                  ✦ Sélection
                </span>
              </div>
            </article>

            {/* Featured Card 2 */}
            <article className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 overflow-hidden p-0.5">
                    <img src="https://source.unsplash.com/random/100x100?face-2" alt="" className="h-full w-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Marie Claire</p>
                    <p className="text-xs text-gray-500">11 Dec · 8 min</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                Le minimalisme digital
              </h3>
              <p className="text-gray-600 line-clamp-3 text-base leading-relaxed mb-4">
                Repenser notre relation avec la technologie pour une vie plus équilibrée...
              </p>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700">
                  Bien-être
                </span>
                <span className="text-xs text-indigo-400">
                  ✦ Tendance
                </span>
              </div>
            </article>

            {/* Featured Card 3 */}
            <article className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 overflow-hidden p-0.5">
                    <img src="https://source.unsplash.com/random/100x100?face-3" alt="" className="h-full w-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sophie Martin</p>
                    <p className="text-xs text-gray-500">10 Dec · 6 min</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                L'avenir de l'apprentissage
              </h3>
              <p className="text-gray-600 line-clamp-3 text-base leading-relaxed mb-4">
                Comment la technologie transforme notre façon d'apprendre et de grandir...
              </p>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700">
                  Éducation
                </span>
                <span className="text-xs text-indigo-400">
                  ✦ Populaire
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">À propos</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    Notre vision
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    L'équipe
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    Aide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">Légal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    Confidentialité
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">Ressources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    Actualités
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              © 2024 Pensées. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 