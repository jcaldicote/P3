/// Check du token

export function check() {
  try {
    return JSON.parse(localStorage.getItem("token"));
  } catch (error) {
    console.warn(error);
    return false;
  }
}

/// Pour sauvegarder le token

export function tokenSave(token) {
  localStorage.setItem("token", JSON.stringify(token));
}
