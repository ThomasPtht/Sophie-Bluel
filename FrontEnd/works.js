


// Récupération des travaux depuis l'API 
fetch('http://localhost:5678/api/works')
    .then(reponse => reponse.json())
    .then((projects) => {


for (let i=0; i < projects.length; i++) {
        const project = projects[i];
        

// Récupération de l'élément du DOM qui accueillera les projets
  const sectionGallery = document.querySelector(".gallery");

// Création d’une balise dédiée à un projet
  const projectElement = document.createElement("figure");


//  Création des balises 
const imageElement = document.createElement("img");
imageElement.src = project.imageUrl;
const titreElement = document.createElement("figcaption");
titreElement.innerText = project.title;



// On rattache les balises à la class .gallery
sectionGallery.appendChild(projectElement);
projectElement.appendChild(imageElement);
projectElement.appendChild(titreElement);

}})

//**************************************/  CATEGORIES FILTRE /**************************************//
// Récupération des catégories depuis l'API

fetch('http://localhost:5678/api/categories')
    .then(reponse => reponse.json())
    .then((categories) => {


console.log(categories)

// Récupération de l'élément du DOM qui accueillera les boutons
const buttonContainer = document.querySelector(".btn-container");


//  Création des balises 

const btnFilterAll = document.createElement("button");
btnFilterAll.textContent = "Tous";
const btnFilterObjects = document.createElement("button");
btnFilterObjects.textContent = "Objets";
const btnFilterAppartments = document.createElement("button");
btnFilterAppartments.textContent = "Appartements";
const btnFilterRestaurants = document.createElement("button");
btnFilterRestaurants.textContent = "Hôtels & restaurants";




buttonContainer.appendChild(btnFilterAll);
buttonContainer.appendChild(btnFilterObjects);
buttonContainer.appendChild(btnFilterAppartments);
buttonContainer.appendChild(btnFilterRestaurants);

 
   
const categorieButton = [btnFilterAll.textContent, btnFilterObjects.textContent, btnFilterAppartments.textContent, btnFilterRestaurants.textContent];
console.log(categorieButton)

const buttonFilter = document.querySelectorAll("button");
const imageElement = document.querySelector("img")



function onButtonClick (event)  {
  console.log (event.currentTarget)
  }
  

buttonFilter.forEach(function(button) {
  button.addEventListener("click", onButtonClick) 
    console.log("clicked")
    if (categorieButton === categories.name ) {
      imageElement.style.display = "block";
    } else {
      imageElement.style.display = "none";
    }

})
})