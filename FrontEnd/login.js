// Définir une fonction pour gérer l'événement de clic sur le bouton "submit"
function handleFormSubmit(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

// Récupérer le formulaire
const loginForm = document.getElementById("form-login");

// Ajouter un gestionnaire d'événement à la soumission du formulaire
loginForm.addEventListener("submit", handleFormSubmit);

// Récupérer les valeurs des champs email et password
const emailValue = document.getElementById("email").value;
const passwordValue = document.getElementById("password").value;

// Récupérer le bouton "submit"
const submitButton = document.getElementById("submit");

// Ajouter un gestionnaire d'événement au clic sur le bouton "submit"
submitButton.addEventListener("click", handleFormSubmit);

fetch('http://localhost:5678/api/users/login', {
method : "POST",
headers: {
    "Content-type" : "application/json;charset=UTF-8"
},
body : JSON.stringify ({
    email: emailValue,
    password: passwordValue
    
})
})
.then(response => response.json())
.then(data => {
  const token = data.token; // Récupérer le token depuis la réponse de l'API
  
  // Stocker le token dans le localStorage 
  localStorage.setItem('token', token);
})

.catch(error => {
  console.error('Erreur lors de l\'authentification :', error);
});

const getToken = localStorage.getItem('token');
fetch('http://localhost:5678/api/users/login', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  // Traiter la réponse de l'API
})
.catch(error => {
  console.error('Erreur lors de la récupération des données :', error);
});
}