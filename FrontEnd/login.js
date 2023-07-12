// Récupérer le formulaire
const loginForm = document.getElementById("form-login");

// Ajouter un gestionnaire d'événement à la soumission du formulaire
loginForm.addEventListener("submit", handleFormSubmit);



// Définir une fonction pour gérer l'événement de clic sur le bouton "submit"
function handleFormSubmit(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Récupérer les valeurs des champs email et password
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    console.log("email:", emailValue);
    console.log("password:", passwordValue);

    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erreur dans l’identifiant ou le mot de passe');
        }
    })
    .then(data => {
        const token = data.token; // Récupérer le token depuis la réponse de l'API
        console.log

        // Stocker le token dans le localStorage
        window.localStorage.setItem('token', token);

        // Rediriger vers la page d'accueil
        
    })
    .catch(error => {
        console.error('Erreur lors de l\'authentification :', error);
    });


    const getToken = localStorage.getItem('token');
    fetch('http://localhost:5678/api/users/login', {
      headers: {
        'Authorization': `Bearer ${getToken}`
      }
    })
    .then(response => {
         // Traiter la réponse de l'API
        // Rediriger vers la page d'accueil
        window.location.href = "index.html";
    
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
        // Afficher le message d'erreur
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = "Erreur dans l’identifiant ou le mot de passe";
    });
    
    }

