import axios from 'axios';

const API_BASE_URL = '/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
});

// Intercepteur pour ajouter le token JWT aux requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log de la requête pour débogage
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response.data);
    return response;
  },
  (error) => {
    // Gérer les erreurs globales ici (ex: 401 Unauthorized, etc.)
    if (error.response) {
      console.error('Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else {
      console.error('Error:', error.message);
    }
    
    if (error.response && error.response.status === 401) {
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
    apiClient.put(`/auth/user/validateAccount/${verificationCode}`),
  
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/user/token', credentials),
}; 