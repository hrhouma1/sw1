# Guide Complet : Configuration CORS React (Vite) avec Spring Boot

## Table des Matières
1. [Prompt Parfait pour Cursor.ai](#prompt-parfait)
2. [Configuration qui Fonctionne](#configuration-qui-fonctionne)
3. [Erreurs Communes et Solutions](#erreurs-communes)
4. [Explications Détaillées](#explications-détaillées)
5. [Bonnes Pratiques](#bonnes-pratiques)

## Prompt Parfait
Copiez exactement ce prompt pour Cursor.ai :
```
Je travaille sur une application React (Vite) qui doit communiquer avec un backend Spring Boot.
- Frontend : http://localhost:5173
- Backend : http://localhost:8085
- Endpoints API :
  * POST /api/v1/auth/user/register
  * PUT /api/v1/auth/validateAccount/{code}
  * POST /api/v1/auth/token

J'ai besoin de :
1. La configuration exacte de vite.config.ts pour le proxy
2. La configuration exacte de apiClient.ts pour axios
3. Les endpoints doivent correspondre exactement à ceux listés
4. Une configuration minimale qui évite les erreurs CORS
```

## Configuration qui Fonctionne

### 1. vite.config.ts
```typescript
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

### 2. apiClient.ts
```typescript
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

export const authApi = {
  register: (userData: any) => 
    apiClient.post('/auth/user/register', userData),
  
  validateAccount: (verificationCode: string) => 
    apiClient.put(`/auth/validateAccount/${verificationCode}`, null),
  
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/token', credentials),
};
```

## Erreurs Communes

| Configuration | Erreur | Cause | Solution |
|--------------|--------|-------|----------|
| URL complète dans API_BASE_URL | CORS error 403 | Le proxy n'est pas utilisé | Utiliser une URL relative ('/v1') |
| Double '/api' dans les chemins | Parsing Error | Conflit entre proxy et URL | Utiliser le rewrite dans vite.config.ts |
| Headers CORS personnalisés | "Forbidden header" | Tentative de définir des headers protégés | Laisser le proxy gérer les headers CORS |
| withCredentials: true | CORS error | Conflit avec les credentials | Mettre withCredentials: false |
| Mauvais endpoint | 404 Not Found | URL ne correspond pas au backend | Vérifier la documentation du backend |
| Body vide dans PUT | 400 Bad Request | Corps manquant | Utiliser null comme corps |

## Explications Détaillées

### Pourquoi cette configuration fonctionne

1. **Proxy Vite**
   - Réécriture correcte des chemins : `/v1` → `/api/v1`
   - Origin correctement définie
   - Pas de manipulation des headers protégés
   - Configuration minimale mais suffisante

2. **Configuration Axios**
   - URL de base simple
   - Headers standards
   - Pas de configuration CORS côté client
   - Gestion simple des erreurs

### Ce qu'il faut éviter

1. **Ne pas ajouter**
   - Headers CORS manuellement
   - Configuration CORS complexe côté client
   - Logs de débogage en production
   - Manipulation des headers protégés

2. **Ne pas modifier**
   - Les URLs du backend
   - Les méthodes HTTP
   - Les headers de sécurité

## Bonnes Pratiques

1. **Structure des URLs**
   ```
   Frontend relatif : /v1/auth/...
   Backend complet : http://localhost:8085/api/v1/auth/...
   ```

2. **Gestion des Erreurs**
   - 401 : Redirection vers login
   - Autres erreurs : Propagation au composant

3. **Sécurité**
   - Token JWT dans Authorization header
   - Pas de credentials par défaut
   - Proxy sécurisé

4. **Maintenance**
   - Configuration minimale
   - Code lisible
   - Pas de duplication

## Notes pour les Étudiants

1. **Ordre d'implémentation**
   1. Installer les dépendances
   2. Configurer vite.config.ts
   3. Créer apiClient.ts
   4. Tester chaque endpoint

2. **Points de Vérification**
   - Les URLs correspondent exactement
   - Le proxy est bien configuré
   - Les headers sont corrects
   - Les erreurs sont gérées

3. **Débogage**
   - Utiliser la console du navigateur
   - Vérifier les requêtes réseau
   - Contrôler les headers
   - Tester avec Postman/Swagger d'abord 

## Historique Complet du Débogage

### Étape 1 : Configuration Initiale (Échec)
```typescript
// Première tentative dans vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {  // ❌ Mauvais préfixe
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

// Première tentative dans apiClient.ts
const API_BASE_URL = 'http://localhost:8085/api/v1';  // ❌ URL complète au lieu de relative
```
**Erreur obtenue** : 
```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:8085/api/v1/auth/user/register. 
(Reason: CORS header 'Access-Control-Allow-Origin' missing)
```

### Étape 2 : Tentative avec Headers CORS (Échec)
```typescript
// Deuxième tentative dans vite.config.ts
server: {
  proxy: {
    '/v1': {
      target: 'http://localhost:8085',
      changeOrigin: true,
      secure: false,
      headers: {
        'Access-Control-Allow-Origin': '*',  // ❌ Header protégé
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',  // ❌ Header protégé
      }
    }
  }
}
```
**Erreur obtenue** :
```
Attempt to set a forbidden header was denied: Access-Control-Request-Method
```

### Étape 3 : Tentative avec Gestion du Corps (Échec)
```typescript
configure: (proxy, _options) => {
  proxy.on('proxyReq', (proxyReq, req) => {
    if (req.body) {  // ❌ Manipulation inutile du corps
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  });
}
```
**Erreur obtenue** : Parsing Error et problèmes de body

### Étape 4 : Solution Finale (Succès)
La configuration qui fonctionne (voir section "Configuration qui Fonctionne")

## Table Complète des Erreurs et Solutions

| Erreur | Message | Cause | Solution | Exemple |
|--------|---------|-------|----------|----------|
| CORS 403 | "CORS header missing" | URL complète utilisée | Utiliser URL relative | `API_BASE_URL = '/v1'` |
| Parsing Error | "syntax error" | Double '/api' | Utiliser rewrite | `rewrite: (path) => '/api${path}'` |
| Forbidden Header | "Attempt to set forbidden header" | Headers CORS manuels | Laisser le proxy gérer | Retirer les headers CORS |
| 404 Not Found | "Endpoint not found" | Mauvais chemin d'API | Vérifier la doc | Corriger l'URL |
| 400 Bad Request | "Bad Request" | Corps manquant/invalide | Envoyer bon format | Utiliser `null` pour PUT vide |
| 401 Unauthorized | "Unauthorized" | Token manquant/invalide | Gérer le token | Ajouter l'intercepteur |

## Problèmes Spécifiques et Solutions

### 1. Problème de Validation d'Account
**Symptôme** : PUT request échoue avec 403
**Cause** : Mauvais endpoint et corps manquant
**Solution** :
```typescript
validateAccount: (code: string) => 
  apiClient.put(`/auth/validateAccount/${code}`, null)
```

### 2. Problème de Login
**Symptôme** : POST /auth/token échoue
**Cause** : Mauvais endpoint (/login au lieu de /token)
**Solution** :
```typescript
login: (credentials) => 
  apiClient.post('/auth/token', credentials)
```

### 3. Problème de Register
**Symptôme** : POST register échoue avec erreur CORS
**Cause** : Headers CORS personnalisés
**Solution** : Configuration minimale du proxy

## Checklist de Débogage

### Vérification des URLs
- [ ] Frontend utilise des chemins relatifs
- [ ] Proxy correctement configuré
- [ ] Pas de double '/api'
- [ ] Endpoints correspondent à la doc

### Vérification des Headers
- [ ] Content-Type correct
- [ ] Pas de headers CORS manuels
- [ ] Authorization header si nécessaire
- [ ] Accept header présent

### Vérification du Proxy
- [ ] changeOrigin: true
- [ ] secure: false pour développement
- [ ] rewrite configuré correctement
- [ ] Origin correcte

### Vérification des Requêtes
- [ ] Méthode HTTP correcte
- [ ] Corps de requête valide
- [ ] URL complète correcte
- [ ] Credentials gérés correctement

## Messages d'Erreur Courants

```javascript
// 1. Erreur CORS classique
"Cross-Origin Request Blocked: The Same Origin Policy disallows reading..."
→ Solution : Utiliser le proxy

// 2. Erreur de Parsing
"Parsing Error: syntax error"
→ Solution : Vérifier les chemins d'API

// 3. Erreur de Header
"Attempt to set a forbidden header was denied"
→ Solution : Retirer les headers CORS manuels

// 4. Erreur d'Autorisation
"401 Unauthorized"
→ Solution : Vérifier le token JWT

// 5. Erreur de Méthode
"405 Method Not Allowed"
→ Solution : Vérifier la méthode HTTP
```

## Commandes Utiles pour le Débogage

```bash
# Vérifier les requêtes réseau
curl -X OPTIONS -H "Origin: http://localhost:5173" http://localhost:8085/api/v1/auth/user/register

# Tester le proxy
curl -v http://localhost:5173/v1/auth/user/register

# Vérifier les headers
curl -I http://localhost:8085/api/v1/auth/user/register
``` 