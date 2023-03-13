// requete de recuperation des travaux via Fetch

const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();

const galleryTravaux = travaux[0];

const portfolioElement = document.getElementById('portfolio');

const galleryElement = document.createElement("div");
galleryElement.classList.add('gallery');

const cadreImageTravaux = document.createElement("figure");
const imgTravaux = document.createElement("img");
imgTravaux.src = galleryTravaux.imageUrl;
const titreTravaux = document.createElement("figcaption");
titreTravaux.innerText = galleryTravaux.title;




portfolioElement.appendChild(galleryElement).appendChild(cadreImageTravaux);
cadreImageTravaux.appendChild(imgTravaux);
cadreImageTravaux.appendChild(titreTravaux);
