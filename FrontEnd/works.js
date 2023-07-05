

// Récupération des travaux depuis l'API 
fetch('http://localhost:5678/api/works')
    .then(reponse => reponse.json())
    .then((projects) => {

const set = new Set (["Objets", "Appartements", "Hotels & restaurants"])

for (let i=0; i < projects.length; i++) {
        const project = projects[i];
   
        
// New set afin de supprimer les doublons du array : 


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
btnFilterAll.id = "btnFilterAll";
const btnFilterObjects = document.createElement("button");
btnFilterObjects.textContent = "Objets";
btnFilterObjects.id = "btnFilterObjects";
const btnFilterAppartments = document.createElement("button");
btnFilterAppartments.textContent = "Appartements";
btnFilterAppartments.id = "btnFilterAppartments";
const btnFilterRestaurants = document.createElement("button");
btnFilterRestaurants.textContent = "Hotels & restaurants";
btnFilterRestaurants.id = "btnFilterRestaurants";



// On rattache les balises à leur parent
buttonContainer.appendChild(btnFilterAll);
buttonContainer.appendChild(btnFilterObjects);
buttonContainer.appendChild(btnFilterAppartments);
buttonContainer.appendChild(btnFilterRestaurants);


// Déclarer le texte du bouton en tant que catégorie bouton
const categorieButton = [btnFilterAll.textContent, btnFilterObjects.textContent, btnFilterAppartments.textContent, btnFilterRestaurants.textContent];
console.log(categorieButton)

// Déclaration d'éléments
const buttonFilter = document.querySelectorAll("button");
const blocFigure = document.querySelectorAll(".gallery figure")



// Sélectionnez les éléments auxquels ajouter l'écouteur d'événement "click" :
buttonFilter.forEach(button => {
  button.addEventListener("click", function(event) {
    const categorieButton = event.currentTarget.textContent;
  console.log(categorieButton);
// Effectuer le filtrage à l'intérieur de la fonction de rappel de l'écouteur d'évenement :
    const categoriesFiltered = categories.filter(function(categorie) {
      return categorie.name === categorieButton;
    });
    console.log(categoriesFiltered);

    // OK JUSQU ICI

    blocFigure.forEach(figure => {
      const dataCategory = figure.category.name
      console.log(dataCategory)

      if (dataCategory) {
        if (categoriesFiltered.includes(dataCategory)) {
          figure.style.display = "block";
        } else {
          figure.style.display = "none";
        }
      }
    });
})
})
})