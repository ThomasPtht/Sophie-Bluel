

// Récupérer la modale : 
const modal = document.getElementById("myModal")

// Récupérer le bouton qui ouvre la modale :
const btn = document.getElementById("edit-2");

// Récupérer le span qui ferme la modale : 
const span = document.getElementsByClassName("close")[0];



// Quand l'utilisateur clique sur le bouton, ouvre la modale
btn.onclick = function() {
  modal.style.display = "block";

// Récupération des travaux depuis l'API 
fetch('http://localhost:5678/api/works')
    .then(reponse => reponse.json())
    .then((modalProjects) => {


for (let i=0; i < modalProjects.length; i++) {

// Création de la const pour un projet
        const modalProject = modalProjects[i];

// Récupération de l'élément du DOM qui accueillera les projets dans la modale
const modalGallery = document.getElementById("modal-works");

// Création d’une balise dédiée à un projet

const modalProjectElement = document.createElement("figure");
modalProjectElement.classList.add("#modal-work");


//  Création des balises 
const imageElement = document.createElement("img");
imageElement.src = modalProject.imageUrl;
const editElement = document.createElement("figcaption");
editElement.innerText = "éditer";
const trashIcon = document.createElement ("i")
trashIcon.classList.add("fa", "fa-trash-can", "trash-icon")

// Création de l'élément d'icône de flèches
// Vérification si c'est la première image
if (i === 0) {
const arrowIcon = document.createElement ("i")
arrowIcon.classList.add("fa","fa-arrows-up-down-left-right", "arrow-icon")
 // Ajout de l'icône de flèche à l'élément du projet
modalProjectElement.appendChild(arrowIcon);
}

// On rattache les balises à leur parent
modalGallery.appendChild(modalProjectElement);
modalProjectElement.appendChild(imageElement);
modalProjectElement.appendChild(editElement);
modalProjectElement.appendChild(trashIcon);


}
})

// Quand l'utilisateur clique sur <span> (x), ferme la modale
span.onclick = function() {
  modal.style.display = "none";
}

// Quand l'utilisateur clique à l'extérieur de la modale, ferme la modale
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}}
