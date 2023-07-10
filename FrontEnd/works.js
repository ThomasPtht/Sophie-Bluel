

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
const categoryName = document.createElement ("p")
categoryName.innerText = project.category.name
categoryName.style.display = "none"
console.log(categoryName)

// Ajout de la classe correspondant à la catégorie au projet
const categoryClass = project.category.name.toLowerCase().replace(/\s+/g, '-');
projectElement.classList.add(categoryClass);


// On rattache les balises à la class .gallery
sectionGallery.appendChild(projectElement);
projectElement.appendChild(imageElement);
projectElement.appendChild(titreElement);
projectElement.appendChild(categoryName)

}

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



// Ajouter l'écouteur d'événement "click" à chaque bouton :
buttonFilter.forEach(button => {
  button.addEventListener("click", function(event) {
    const categorieButton = event.currentTarget.textContent;
  console.log(categorieButton);

// Filtrer les catégories en fonction du texte du bouton :
    const categoriesFiltered = projects.filter(function(project) {
      return project.category.name === categorieButton;
    });

   
   // Masquer ou afficher les projets en fonction des catégories filtrées
   const blocFigure = document.querySelectorAll("figure");
   if (categorieButton === "Tous") {
     blocFigure.forEach(figure => {
       figure.style.display = "block";
     });
   } else {
     blocFigure.forEach(figure => {
       const categorieNameFigure = figure.classList;
       if (categoriesFiltered.some(category => categorieNameFigure.contains(category.category.name.toLowerCase().replace(/\s+/g, '-')))) {
         figure.style.display = "block";
       } else {
         figure.style.display = "none";

    }
  })
}})
    })
  })
})
    