// Récupérer la modale : 
const modal = document.getElementById("myModal");

// Récupérer le bouton qui ouvre la modale :
const btn = document.getElementById("edit-2");

// Récupérer le span qui ferme la modale : 
const span = document.getElementsByClassName("close")[0];

// Déclaration de la variable trashIcon en dehors de la boucle for
let trashIcon = null;

// Récupération de l'élément du DOM qui accueillera les projets dans la modale
const modalGallery = document.getElementById("modal-works");

// Récupérer le token depuis le localStorage
const token = window.localStorage.getItem('token');

// Quand l'utilisateur clique sur <span> (x), ferme la modale
span.onclick = function() {
  modal.style.display = "none";
};

// Quand l'utilisateur clique à l'extérieur de la modale, ferme la modale
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Quand l'utilisateur clique sur le bouton, ouvre la modale
btn.onclick = function() {
  modal.style.display = "block";

  // Empeche l'ajout des projets en boucle lorsqu'on clique en dehors de la modale pour sortir
  modalGallery.innerHTML = "";

  // Récupération des travaux depuis l'API 
  fetch('http://localhost:5678/api/works')
    .then(reponse => reponse.json())
    .then((modalProjects) => {
      for (let i = 0; i < modalProjects.length; i++) {

        // Création de la constante pour un projet
        const modalProject = modalProjects[i];

        // Création d’une balise dédiée à un projet
        const modalProjectElement = document.createElement("figure");
        modalProjectElement.classList.add("modal-work");

        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = modalProject.imageUrl;
        imageElement.style.width = "100%";
        const editElement = document.createElement("figcaption");
        editElement.innerText = "éditer";
        
  
        // Création de l'élément d'icône de poubelle
        const newTrashIcon = document.createElement("i");
        newTrashIcon.classList.add("fa", "fa-trash-can", "trash-icon");

        // Création de l'élément d'icône de flèches + Vérification si c'est la première image
        if (i === 0) {
          const arrowIcon = document.createElement("i");
          arrowIcon.classList.add("fa", "fa-arrows-up-down-left-right", "arrow-icon");

          // Ajout de l'icône de flèche à l'élément du projet
          modalProjectElement.appendChild(arrowIcon);
        }

        // On rattache les balises à leur parent
        modalGallery.appendChild(modalProjectElement);
        modalProjectElement.appendChild(imageElement);
        modalProjectElement.appendChild(editElement);
        modalProjectElement.appendChild(newTrashIcon);

        // Assigner la nouvelle icône de poubelle à la variable trashIcon
        trashIcon = newTrashIcon;

        // Quand l'utilisateur clique sur la poubelle d'un projet, supprime le projet :
        trashIcon.onclick = function () {
          // Récupérer l'identifiant du projet
          const projectId = modalProject.id; 
          console.log(projectId);

          // Effectuer la requête DELETE à l'API
          fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
            .then(response => {
                console.log(response)
              if (response.ok) {
                // La suppression a réussi, vous pouvez effectuer des actions supplémentaires si nécessaire
                console.log('Projet supprimé avec succès');

                // Effectuer à nouveau la requête pour récupérer les projets mis à jour
                fetch('http://localhost:5678/api/works')
                  .then(reponse => reponse.json())
                  .then((modalProjects) => {
                   
                  });
              } else {
                // La suppression a échoué, afficher un message d'erreur ou effectuer des actions supplémentaires si nécessaire
                console.log('Échec de la suppression du projet');
              }
            })
            .catch(error => {
              // Une erreur s'est produite lors de la suppression, afficher un message d'erreur ou effectuer des actions supplémentaires si nécessaire
              console.error('Erreur lors de la suppression du projet', error);
            });
        };
      }
    });
}

 



//****************/ Ajout nouveau projet *************//

// Récupérer la modale : 
const secondModal = document.getElementById("secondModal");

// Récupérer le bouton qui ouvre la modale :
const addButton = document.getElementsByClassName("add-button")[0];

// Récupérer le span qui ferme la modale : 
const close = document.getElementsByClassName("close-modal")[0];

// Quand l'utilisateur clique à l'extérieur de la seconde modale, ferme la seconde modale
window.addEventListener('click', function(event) {
  if (event.target === secondModal) {
    secondModal.style.display = "none";
  }
});



// Associer les catégories à l'élément html select :
// Récupérer l'élément HTML select
const selectElement = document.getElementById ("select")

// Créer une option vide par défaut
const defaultOption = document.createElement("option");
defaultOption.disabled = true;
defaultOption.selected = true;
defaultOption.textContent = ""; //Message par défaut vide

// Ajouter l'option par défaut à l'élément select
selectElement.appendChild(defaultOption);


// Récupération des catégories depuis l'API
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {

// Parcourir la liste des catégories
for (const category of categories) {
// Créer une option pour chaque catégorie
const optionElement = document.createElement("option");
optionElement.textContent = category.name; 
  
// Ajouter l'option à l'élément select
selectElement.appendChild(optionElement);
}
})
.catch(error => {
      console.error('Erreur lors de la récupération des catégories :', error);
    });



  // Quand l'utilisateur clique sur <span> (x), ferme la modale
  const closeModal = document.getElementsByClassName("close-modal")[0];
  closeModal.onclick = function() {
    secondModal.style.display = "none";
  };



const galleryElement = document.querySelector(".gallery")

  // Quand l'utilisateur clique sur le bouton ajouter une photo, ouvre la 2eme modale
addButton.onclick = function() {
    secondModal.style.display = "block";
    modal.style.display = "none"
   
   galleryElement.forEach(element => {
      element.style.display = "block";
    });

// Récupérer tous les éléments avec la classe "objets", "appartements", etc.
const allProjectElements = document.querySelectorAll(".objets, .appartements, .restaurants");

// Parcourir tous les éléments et les mettre en "display: block"
allProjectElements.forEach(element => {
  element.style.display = "block";
});
}




 // Quand l'utilisateur clique sur la flèche de retour, ferme la modale et ouvre la première modale
 const arrowBack = document.getElementsByClassName("arrow-left")[0];
 arrowBack.onclick = function () {
     secondModal.style.display = "none";
     modal.style.display = "block"


// Récupérer tous les éléments avec la classe "modal-work"
const modalWorkElements = document.querySelectorAll(".modal-work");

// Parcourir tous les éléments et les mettre en "display: block"
modalWorkElements.forEach(element => {
  element.style.display = "block";
});

 }


//  Récupérer le bouton d'ajout de photo et l'input file
const addPhoto = document.getElementById("add-photo")
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");

addPhoto.addEventListener("click", function(event) {
   // Arrêter la propagation de l'événement pour empêcher la fermeture de la modale
   event.stopPropagation();
   // Ouvrir l'input file pour récupérer un fichier
   imageInput.click();
 
  });

// Ajouter un événement "click" à la modale pour empêcher sa fermeture lorsque l'input file est ouvert
secondModal.addEventListener("click", function(event) {
    event.stopPropagation();
});


  imageInput.addEventListener("change", function(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
    
        reader.onload = function() {
          imagePreview.src = reader.result;
        };
    
        reader.readAsDataURL(selectedFile);
      }
    })
  
