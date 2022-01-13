import jwtDecode from 'jwt-decode';

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  let user;

  if (token) {
    user = jwtDecode(token);
  }

  return user;
};

export function logout() {
  try {
    localStorage.removeItem('token');

    return (window.location = '#/sign-in');
  } catch (err) {
    console.log(err, 'err in log out');
  }
}
