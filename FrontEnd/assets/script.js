import { fetchWorks } from './api.js';
import { fetchFilterBar } from './api.js';
import { createAppend } from './dom.js';

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

// Affichage du menu filtre des travaux

function renderItemAll() {
  const itemAll = createAppend('button', filterBar);
  itemAll.textContent = 'Tous';
  itemAll.classList.add('btn0');
}

function renderWorkBar(workBar) {
  const btnElm = createAppend('button', filterBar);
  btnElm.innerText = workBar.name;
  btnElm.classList.add(`btn${workBar.id}`);
}

function renderWorksBar(workBars) {
  for (const item of workBars) {
    renderWorkBar(item);
  }
}

async function filterBarMenu() {
  const items = await fetchFilterBar();
  renderItemAll();
  renderWorksBar(items);
}

filterBarMenu();

const resultFilter = await fetchWorks();

//Rendu filtre 'Tous'
const btnAllFilter = document.querySelector('.btn0');
btnAllFilter.addEventListener('click', function () {
  const objectsFilter = resultFilter.filter((object) => {
    return object;
  });
  document.querySelector('.gallery').innerHTML = '';
  renderWorks(objectsFilter);
});

//Rendu filtre 'Objets'
const btnObjectFilter = document.querySelector('.btn1');
btnObjectFilter.addEventListener('click', function () {
  const objectsFilter = resultFilter.filter((object) => {
    return object.category.name == 'Objets';
  });
  document.querySelector('.gallery').innerHTML = '';
  renderWorks(objectsFilter);
});

//Rendu filtre 'Appartements'
const btnApartFilter = document.querySelector('.btn2');
btnApartFilter.addEventListener('click', function () {
  const objectsFilter = resultFilter.filter((object) => {
    return object.category.name == 'Appartements';
  });
  document.querySelector('.gallery').innerHTML = '';
  renderWorks(objectsFilter);
});

//Rendu filtre 'Hotels & restaurants'
const btnHotelFilter = document.querySelector('.btn3');
btnHotelFilter.addEventListener('click', function () {
  const objectsFilter = resultFilter.filter((object) => {
    return object.category.name == 'Hotels & restaurants';
  });
  document.querySelector('.gallery').innerHTML = '';
  renderWorks(objectsFilter);
});
