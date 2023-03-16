/**Requête fetch pour récupérer les datas de l'API web
 *
 * @returns {HTMLElement} - retourne l'élément créer
 */

export async function fetchWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  return response.json();
}
