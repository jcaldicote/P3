/**Requête fetch pour récupérer les datas de l'API web
 *
 * @returns {HTMLElement} - retourne l'élément créer
 */

import { check } from './auth.js';

const link = 'http://localhost:5678';

async function apiFetch(method, url, body, options = {}) {
  const headers = { ...options.headers };
  const token = check();
  if (token) {
    headers.Autorization = `Bearer ${token}`;
  }
  if (body instanceof FormData) {
  } else if (typeof body === 'object') {
    headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(`${link}${url}`, {
    ...options,
    method,
    body,
    headers,
  });

  let data = await response.text();
  try {
    data = JSON.parse(data);
  } catch (error) {}
  return data;
}

export const fetchWorks = () => apiFetch('GET', '/api/works');

// export async function fetchWorks() {
//   const response = await fetch('http://localhost:5678/api/works');
//   return response.json();
// }

export const fetchFilterBar = () => apiFetch('GET', '/api/categories');

// export async function fetchFilterBar() {
//   const response = await fetch('http://localhost:5678/api/categories');
//   return response.json();
// }
