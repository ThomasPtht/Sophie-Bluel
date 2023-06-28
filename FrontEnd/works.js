


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

    }
  }
    )



// Récupération des catégories depuis l'API

fetch('http://localhost:5678/api/categories')
    .then(reponse => reponse.json())
    .then((categories) => {


      for (let i=0; i < categories.length; i++) {
          const categorie = categories[i];



// Création d’une balise dédiée à une catégorie
const categorieElement = document.createElement("p");

//  Création des balises 
const nameElement = document.createElement("button");
nameElement.innerText = categorie.name;

categorieElement.appendChild(nameElement);

// gestion des boutons 
const buttonFilter = document.querySelectorAll("button");


buttonFilter.addEventListener("click", function () {
  console.log("clicked");
  const categoriesFiltered = categories.filter(function (categorie) {
    return categorie.name == "Objets";

    console.log(categoriesFiltered)


  })}

) 


          }})



