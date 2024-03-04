
let datetime = document.querySelector(".date-heure")

/**
 * recuperation en temps reel de la date et heure dans le navigateur
 */
/*
function afficheLaDate(){
    let D = new Date();
    // extraire l'heure sous forme de chaîne de caractères 
    let date = D.toLocaleDateString();
    // extraire l'heure sous forme de chaîne de caractères 
    let time = D.toLocaleTimeString();
    datetime.innerHTML = `<h2>${date}</h2>
    <p>${time}</p>`;
    
    // pour planifier l'exécution de la fonction avant le prochain rafraîchissement de l'écran. Cela permet d'obtenir une mise à jour fluide de l'heure en temps réel.
   requestAnimationFrame(afficheLaDate);
}

afficheLaDate();

*/



/***
 * afficher la date
 * @param {Objet} // date courrent avec heure
 * 
 */
function shwoDateHour (date){
    // appel fonction date
    newFormatDate = extractDate (date);
    // appel fonction heure
    newFormatHour = extractHour (date);
    // construction dom et integration des données
    // je cible l'endroit pour inserer
    let zone = document.querySelector(".date-heure")
    // je declare le template
    let template = ``; 
    // je remplit le template avec les element html et les données
    template = 
    `
    <p>${newFormatDate}</p> 
    <p>${newFormatHour}</p> 
    `
    // j'insere dans le html le template dans la zone
    zone.innerHTML = template;
}