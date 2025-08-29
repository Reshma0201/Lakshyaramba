const TOKEN_KEY = 'token';

export const tokenUtils = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => token && localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  hasToken: () => !!localStorage.getItem(TOKEN_KEY),

  parseToken: (token) => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  },

  isTokenExpired: (token) => {
    try {
      const payload = tokenUtils.parseToken(token);
      if (!payload || !payload.exp) return true;
      return payload.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  },

  getTokenExpiration: (token) => {
    try {
      const payload = tokenUtils.parseToken(token);
      return payload?.exp ? new Date(payload.exp * 1000) : null;
    } catch {
      return null;
    }
  },
};
