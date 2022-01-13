import jwtDecode from 'jwt-decode';

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  let user;

  if (token) {
    user = jwtDecode(token);
  }

  return user;
};

