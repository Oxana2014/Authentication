import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('Expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  console.log('expirationDate.getTime():', expirationDate)
  console.log('now.getTime(): ', now)
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();
  console.log('tokenDuration: ', tokenDuration)

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}