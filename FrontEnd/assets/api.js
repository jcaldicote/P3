/**Requête fetch pour récupérer les datas de l'API web
 *
 * @returns {HTMLElement} - retourne l'élément créer
 */

import { check } from "./auth.js";

const link = "http://localhost:5678";

export async function apiFetch(method, url, body, options = {}) {
  const headers = { ...options.headers };
  const token = check();
  if (token) {
    headers.Autorization = `Bearer ${token}`;
  }
  if (body instanceof FormData) {
  } else if (typeof body === "object") {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }
  console.log(`${method} ${url}`);

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
  console.groupCollapsed(`${method} ${url}`);

  console.log("headers", headers);
  console.log("body", body);
  console.log("response", response);
  console.log("data", data);
  console.groupEnd();
  return data;
}

export const fetchWorks = () => apiFetch("GET", "/api/works");

export const fetchFilterBar = () => apiFetch("GET", "/api/categories");

export const fetchLogin = (body) => apiFetch("POST", "/api/users/login", body);
