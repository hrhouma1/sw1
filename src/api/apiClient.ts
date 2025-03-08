import axios from 'axios';

const API_BASE_URL = 'http://localhost:8085/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs globales ici (ex: 401 Unauthorized, etc.)
    if (error.response && error.response.status === 401) {
      // Rediriger vers la page de login si le token est expiré ou invalide
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Fonctions d'API pour l'authentification
export const authApi = {
  register: (userData: any) => 
    apiClient.post('/auth/user/register', userData),
  
  validateAccount: (verificationCode: string) => 
    apiClient.put(`/auth/validateAccount/${verificationCode}`),
  
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/token', credentials),
}; 