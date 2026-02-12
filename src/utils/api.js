import { getAuthToken } from './auth';

const API_BASE = process.env.REACT_APP_API_URL || '';

async function refreshToken(refreshToken) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken })
    });
    const json = await res.json();
    if (json.success) return json.token;
    return null;
  } catch (err) { console.error('refresh failed', err); return null; }
}

export default async function apiFetch(path, options = {}) {
  const token = getAuthToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(API_BASE + path, { ...options, headers });
  if (res.status === 401) {
    // try refresh
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (current?.refreshToken) {
      const newToken = await refreshToken(current.refreshToken);
      if (newToken) {
        // update stored token
        const updated = { ...current, token: newToken };
        localStorage.setItem('currentUser', JSON.stringify(updated));
        headers['Authorization'] = `Bearer ${newToken}`;
        return fetch(API_BASE + path, { ...options, headers });
      }
    }
  }
  return res;
}