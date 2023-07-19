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

// Quand l'utilisateur clique sur le bouton, ouvre la modale
btn.onclick = function() {
  modal.style.display = "block";


  // Vider le contenu de la modale avant d'ajouter les nouveaux projets
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
        modalProjectElement.classList.add("#modal-work");

        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = modalProject.imageUrl;
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
          const projectId = modalProject.id; // Assurez-vous que vous avez une propriété "id" dans l'objet modalProject
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
                    // Ajouter les projets mis à jour à la modale
                    // ... Votre code pour ajouter les projets à la modale
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
};