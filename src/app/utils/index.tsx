import Cookies from 'js-cookie';
export const isAuthenticated = () => {
  const sessionId = Cookies.get('token');

  if (sessionId) {
    return true;
  }

  return true;
};
