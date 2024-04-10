export function updateLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event('storage'));
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
  window.dispatchEvent(new Event('storage'));
}
