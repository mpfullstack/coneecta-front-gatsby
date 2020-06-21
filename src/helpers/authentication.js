export function isLoggedIn() {
  return true;
  // return sessionStorage.getItem('loggedin');
}

export function login() {
  sessionStorage.setItem('loggedin', true);
}

export function logout() {
  sessionStorage.removeItem('loggedin');
}