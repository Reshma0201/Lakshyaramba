///manages jwt token in the app
const TOKEN_KEY = 'token';

export const tokenUtils = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  hasToken: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  parseToken: (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  },

  isTokenExpired: (token) => {
    try {
      const payload = tokenUtils.parseToken(token);
      if (!payload || !payload.exp) {
        return true;
      }

      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.log("Error validating token:", error)
      return true;
    }
  },

  getTokenExpiration: (token) => {
    try {
      const payload = tokenUtils.parseToken(token);
      return payload?.exp ? new Date(payload.exp * 1000) : null;
    } catch (error) {
      console.log("Error getting token expiraition", error)
      return null;
    }
  },
};

export default tokenUtils;