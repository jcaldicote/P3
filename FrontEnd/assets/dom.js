/**Permet de créer un élément et de l'ajouter à un autre
 *
 * @param {string} name - nom de l'élement
 * @param {HTMLElement} elm - élément auquel il se rattache
 * @returns {HTMLElement} - retourne l'élément créer
 */

export function createAppend(name, elm) {
  return elm.appendChild(document.createElement(name));
}
