# Solution Complète : React (Vite) + Spring Boot sans Erreurs CORS

## Solution Finale Complète

### 1. Installation des Dépendances
```bash
# Installation des dépendances nécessaires
npm install axios @types/node --save-dev
npm install @vitejs/plugin-react --save-dev
```

### 2. Configuration Complète de Vite
```typescript
// vite.config.ts
/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/api${path}`,
        headers: {
          'Origin': 'http://localhost:8085'
        },
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Origin', 'http://localhost:8085');
          });
        }
      }
    }
  }
})
```

### 3. Configuration Complète d'Axios
```typescript
// src/api/apiClient.ts
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
    if (error.response?.status === 401) {
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
    apiClient.put(`/auth/validateAccount/${verificationCode}`, null),
  
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/token', credentials),
};
```

### 4. Types TypeScript pour les Requêtes
```typescript
// src/types/auth.types.ts
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  profilePicture?: string;
  roleTypes: 'USER';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  // autres champs selon votre API
}
```

### 5. Exemple d'Utilisation dans un Composant React
```typescript
// src/components/auth/Register.tsx
import React, { useState } from 'react';
import { authApi } from '../../api/apiClient';
import { RegisterRequest } from '../../types/auth.types';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    roleTypes: 'USER'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.register(formData);
      console.log('Inscription réussie:', response.data);
      // Redirection ou autre logique
    } catch (error) {
      console.error('Erreur lors de l'inscription:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Vos champs de formulaire */}
    </form>
  );
};
```

## Exemples de Requêtes qui Fonctionnent

### 1. Register
```typescript
// Exemple de requête register qui fonctionne
const registerData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "Password123!",
  phone: "1234567890",
  roleTypes: "USER"
};

const response = await authApi.register(registerData);
// POST /v1/auth/user/register
// → Proxy vers http://localhost:8085/api/v1/auth/user/register
```

### 2. Validate Account
```typescript
// Exemple de validation qui fonctionne
const code = "123456";
const response = await authApi.validateAccount(code);
// PUT /v1/auth/validateAccount/123456
// → Proxy vers http://localhost:8085/api/v1/auth/validateAccount/123456
```

### 3. Login
```typescript
// Exemple de login qui fonctionne
const loginData = {
  email: "john@example.com",
  password: "Password123!"
};

const response = await authApi.login(loginData);
// POST /v1/auth/token
// → Proxy vers http://localhost:8085/api/v1/auth/token
```

## Points Clés de la Solution

### Configuration du Proxy
- Utilise le préfixe `/v1`
- Réécriture vers `/api/v1`
- Origin définie correctement
- Pas de headers CORS manuels

### Configuration Axios
- URL de base relative
- Headers standards
- Gestion du token JWT
- Gestion des erreurs 401

### Gestion des Requêtes
- Corps null pour PUT sans body
- Content-Type JSON
- Gestion des tokens
- Redirection sur 401

## Vérification de la Solution

### Comment Vérifier que Tout Fonctionne
1. Ouvrir la console développeur (F12)
2. Aller sur la page d'inscription
3. Remplir le formulaire et soumettre
4. Vérifier dans l'onglet Network :
   - La requête part vers `/v1/auth/user/register`
   - Le proxy la redirige vers le backend
   - Pas d'erreurs CORS
   - Status 200 OK

### Requêtes Réseau Attendues
```
Request URL: http://localhost:5173/v1/auth/user/register
Proxy vers: http://localhost:8085/api/v1/auth/user/register
Method: POST
Status: 200 OK
```

## Maintenance et Évolution

### Ajout de Nouveaux Endpoints
```typescript
// Exemple d'ajout d'un nouvel endpoint
export const authApi = {
  // ... endpoints existants ...
  
  // Nouvel endpoint
  resetPassword: (email: string) => 
    apiClient.post('/auth/reset-password', { email }),
};
```

### Modification des Types
```typescript
// Exemple d'extension des types
export interface RegisterRequest {
  // ... champs existants ...
  additionalInfo?: {
    newsletter: boolean;
    preferences: string[];
  };
}
``` 