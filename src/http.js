export const auth = () => {
  const token = localStorage.getItem('token');

  if (!token) window.location = '/login';
};
