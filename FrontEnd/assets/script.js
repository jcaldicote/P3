// requête de recuperation des travaux via Fetch

const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();

const enteteTravaux = document.createElement("h2");
enteteTravaux.innerText = "Récupération des travaux";
const galleryElement = document.createElement("div");
galleryElement.classList.add('gallery');


//Boucle for pour prendre compte tt les img des travaux
for (let i = 0; i < travaux.length; i++) {
const galleryTravaux = travaux[i];

//récupération de l'élément 
const portfolioElement = document.getElementById('portfolio');


//Création des balises

const cadreImageTravaux = document.createElement("figure");
const imgTravaux = document.createElement("img");
imgTravaux.src = galleryTravaux.imageUrl;
const titreTravaux = document.createElement("figcaption");
titreTravaux.innerText = galleryTravaux.title;

//Attachement des balises au DOM
portfolioElement.appendChild(enteteTravaux);
portfolioElement.appendChild(galleryElement).appendChild(cadreImageTravaux);
cadreImageTravaux.appendChild(imgTravaux);
cadreImageTravaux.appendChild(titreTravaux);
};
