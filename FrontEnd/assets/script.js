import { fetchWorks } from './api.js';
import { createAppend } from './dom.js';

const gallery = document.querySelector('.gallery');

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
