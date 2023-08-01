// Récupérer le formulaire
const loginForm = document.getElementById("form-login");

// Ajouter un écouteur d'événement à la soumission du formulaire
loginForm.addEventListener("submit", handleFormSubmit);


// Définir une fonction pour gérer l'événement de clic sur le bouton "submit"
function handleFormSubmit(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire et rechargement de la page

    // Récupérer les valeurs des champs email et password
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;


 fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    })
    .then(response => {
      console.log(response)
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erreur dans l’identifiant ou le mot de passe');
        
        }
    })
    .then(data => {
        console.log(data)
        const token = data.token; // Récupérer le token depuis la réponse de l'API
       
        // Stocker le token dans le localStorage
        window.localStorage.setItem('token', token);
         // Redirige l'utilisateur vers la page d'accueil
        window.location.href = "index.html";
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
      // Afficher le message d'erreur quand mdp et/ou email incorrect
      const errorMessageElement = document.getElementById("error-message")
      errorMessageElement.textContent = "Erreur dans l’identifiant ou le mot de passe";
    })
  }