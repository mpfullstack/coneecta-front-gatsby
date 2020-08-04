export const COOKIE = 1;

export function getAuthMechanism() {
  return COOKIE;
}

export function isLoggedIn() {
  return String(sessionStorage.getItem('loggedin')) === 'true';
}

export function login() {
  sessionStorage.setItem('loggedin', true);
}

export function logout() {
  sessionStorage.removeItem('loggedin');
}