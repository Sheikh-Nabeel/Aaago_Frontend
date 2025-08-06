// Token validation and cleanup utilities
export const cleanToken = (token) => {
  if (!token) return null;
  
  // Remove whitespace
  let cleaned = token.trim();
  
  // Remove quotes if they exist
  cleaned = cleaned.replace(/^["']|["']$/g, '');
  
  // Basic check for JWT format (3 parts separated by dots)
  const parts = cleaned.split('.');
  if (parts.length !== 3) {
    console.warn('Token does not appear to be in valid JWT format');
    return null;
  }
  
  return cleaned;
};

export const validateToken = (token) => {
  if (!token) return false;
  
  const cleaned = cleanToken(token);
  if (!cleaned) return false;
  
  // Basic JWT format validation (3 parts)
  const parts = cleaned.split('.');
  if (parts.length !== 3) return false;
  
  // Check if all parts exist and are not empty
  return parts.every(part => part && part.length > 0);
};

export const getStoredToken = () => {
  const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
  
  const localStorageToken = localStorage.getItem('token');
  
  // Try to get token from cookies first, then localStorage
  const token = cookieToken || localStorageToken;
  
  if (token) {
    const cleaned = cleanToken(token);
    if (cleaned && validateToken(cleaned)) {
      return cleaned;
    }
  }
  
  return null;
}; 