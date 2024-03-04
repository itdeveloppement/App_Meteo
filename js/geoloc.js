// recuperation de la geolocalisation
    
    // La méthode Geolocation.getCurrentPosition() fournit la position actuelle de l'appareil.
    // on applique la methode sur le navigateur qui pren la fonction position comme argument
    navigator.geolocation.getCurrentPosition(position => {
    // sur l'objet position on recupere la latitude et la longitude 
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // appel de la fonction fetch via la fonction url
    // asynchrone : tant que les données ne sont pas disponible la suite n'est pas executé
    utilisationLatEtLong(latitude, longitude);
    },
    );

    /**
     * @param {number} latitude 
     * @param {number} longitude 
    */
    function utilisationLatEtLong (latitude, longitude){

        /// j'utilise latitude et longitude
    };