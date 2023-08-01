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

// Récupérer l'icone par défaut
const defaultImageSource = "./assets/icons/picture-svgrepo-com 1.svg";



// Fonction pour cacher l'aperçu de l'image et réinitialiser l'input file
function hideImagePreview() {
  imagePreview.src = defaultImageSource; // Cacher l'aperçu de l'image
  addPhotoButton.style.display = "block"; // Afficher le bouton d'ajout de photo
  imageDescription.style.display = "block"; // Afficher le paragraphe de description
  imageInput.value = ""; // Réinitialiser l'input file en vidant sa valeur
  const textInput = document.getElementById("text-input") //Réinitialiser l'input du titre
  textInput.value = "";
  const select = document.getElementById("select")
  select.value = "";
  const imageInputContainer = document.querySelector(".image-input-container");
  imageInputContainer.style.paddingTop = "30px"; // Remettre le padding-top par défaut
}


  // Récupérer les éléments pour le messageur d'erreur si donnée manquante
  
  const errorTitle = document.getElementById("title-error");
  const errorImage = document.getElementById("image-error");
  const errorSelect = document.getElementById("select-error");

  function resetErrorMessages() {
 
    errorTitle.textContent = "";
    errorImage.textContent = "";
    errorSelect.textContent = "";
    }
  





// Quand l'utilisateur clique à l'extérieur de la seconde modale, ferme la seconde modale
window.addEventListener('click', function(event) {
  if (event.target === secondModal) {
    secondModal.style.display = "none";
    imagePreview.style.display = "block"
    hideImagePreview();
    resetErrorMessages();
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
optionElement.value = category.id; // Associer l'ID de la catégorie à la valeur de l'option
  
// Ajouter l'option à l'élément select
selectElement.appendChild(optionElement);
}
})
.catch(error => {
      console.error('Erreur lors de la récupération des catégories :', error);
    });
// Quand l'utilisateur sélectionne une option dans le menu déroulant
selectElement.addEventListener("change", function(event) {
 // Récupérer la valeur sélectionnée (ID de la catégorie)
  const selectedCategoryId = event.target.value;
});






  // Quand l'utilisateur clique sur <span> (x), ferme la modale
  const closeModal = document.getElementsByClassName("close-modal")[0];
  closeModal.onclick = function() {
    secondModal.style.display = "none";
    hideImagePreview();
    resetErrorMessages();
  };



  // Quand l'utilisateur clique sur le bouton ajouter une photo, ouvre la 2eme modale
addButton.onclick = function() {
    secondModal.style.display = "block";
    modal.style.display = "none"

}


 // Quand l'utilisateur clique sur la flèche de retour, ferme la modale et ouvre la première modale
 const arrowBack = document.getElementsByClassName("arrow-left")[0];
 arrowBack.onclick = function () {
     secondModal.style.display = "none";
     modal.style.display = "block"
     hideImagePreview();
     resetErrorMessages();


}


//  Récupérer le bouton d'ajout de photo et l'input file
const addPhotoButton = document.getElementById("add-photo")
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const imageDescription = document.getElementById("image-description");

addPhotoButton.addEventListener("click", function(event) {
   // Arrêter la propagation de l'événement pour empêcher la fermeture de la modale
   event.preventDefault();
   event.stopPropagation();
   // Ouvrir l'input file pour récupérer un fichier
   imageInput.click();
 
  });

  imageInput.addEventListener("change", function(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
    
        reader.onload = function() {
          imagePreview.src = reader.result;
          imagePreview.style.display = "block"; // Afficher l'image prévisualisée
          addPhotoButton.style.display = "none"; // Cacher le bouton d'ajout de photo
          imageDescription.style.display = "none"; // Cacher le paragraphe de description
            // Supprimer le padding-top de l'image prévisualisée
          const imageInputContainer = document.querySelector(".image-input-container")
          imageInputContainer.style.paddingTop = "0"

        };
    
        reader.readAsDataURL(selectedFile);
      }
    })




// AJOUT D UN PROJET :


// Récupérer le formulaire
const myForm = document.querySelector(".my-form")

myForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Récupérer les données du formulaire
  const image = document.getElementById("image-input").files[0]
  const title = document.getElementById("text-input").value;
  const categoryId = document.getElementById("select").value;

  console.log(image)
  console.log(title)
  console.log(categoryId)

  const messageImageError = document.getElementById("image-input").value
// Messages d'erreurs dans le formulaire
  if (messageImageError == "") {
    errorImage.textContent = "Image non sélectionnée";
  } else {
    errorImage.textContent = "";
  }
  if (title === "") {
    errorTitle.textContent = "Titre non renseigné";
  } else {
    errorTitle.textContent = "";
  }

  if (categoryId === "") {
    errorSelect.textContent = "Catégorie non renseignée";
  } else {
    errorSelect.textContent = "";
  }
  // Vérification finale pour savoir si des erreurs existent
  if (image === "" || title === "" || categoryId === "") {
    // Il y a des erreurs dans le formulaire, on ne soumet pas le formulaire
    return;
  }



// Créer l'objet FormData et ajouter les champs du formulaire
const formData = new FormData();
formData.append("image", image);
formData.append("title", title);
formData.append("category", categoryId);


  // Récupérer le token depuis le local storage
  const token = localStorage.getItem("token");
 
  

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body: formData,
  })
    .then((response) => response.json ())
    .then ((data) => {
  })
  .catch(error => {
    console.error('Erreur:', error);
   
  });
});