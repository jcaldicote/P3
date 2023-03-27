export function check() {
  try {
    return JSON.parse(localStorage.getItem("token"));
  } catch (error) {
    console.warn(error);
    return false;
  }
}

export function tokenSave(token) {
  localStorage.setItem("token", JSON.stringify(token));
}
