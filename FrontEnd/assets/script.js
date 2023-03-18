import { fetchWorks } from './api.js';
import { fetchFilterBar } from './api.js';
import { createAppend } from './dom.js';
import { createAppendFilter } from './dom.js';

const gallery = document.querySelector('.gallery');
const filterBar = document.querySelector('.filterBar');

//Affichage de la galerie par défaut

function renderWork(work) {
  const workElm = createAppend('figure', gallery);
  const imgElm = createAppend('img', workElm);
  imgElm.src = work.imageUrl;

  const titreElm = createAppend('figcaption', workElm);
  titreElm.innerText = work.title;
}

function renderWorks(works) {
  for (const work of works) renderWork(work);
}

async function main() {
  const travaux = await fetchWorks();
  renderWorks(travaux);
}
main();

//Affichage du menu filtre des travaux

function renderWorkBar(workBar) {
  const btnElm = createAppendFilter('button', filterBar);
  btnElm.innerText = workBar.name;
}

function renderWorksBar(workBars) {
  for (const item of workBars) renderWorkBar(item);
}

async function filterBarMenu() {
  const items = await fetchFilterBar();
  renderWorksBar(items);
}

filterBarMenu();
