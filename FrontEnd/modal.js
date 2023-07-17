

// Récupérer la modale : 
const modal = document.getElementById("myModal")

// Récupérer le bouton qui ouvre la modale :
const btn = document.getElementById("edit-2");

// Récupérer le span qui ferme la modale : 
const span = document.getElementsByClassName("close")[0];

// Quand l'utilisateur clique sur le bouton, ouvre la modale
btn.onclick = function() {
  modal.style.display = "block";
}

// Quand l'utilisateur clique sur <span> (x), ferme la modale
span.onclick = function() {
  modal.style.display = "none";
}

// Quand l'utilisateur clique à l'extérieur de la modale, ferme la modale
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Récuperer mes projets dans la modale : 
const modalProjects = works.js.queryselector("projects")

projects = console.log(projects)