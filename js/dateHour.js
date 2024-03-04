


/**
 * extract les elements jour mois année de la date
 * @param {*} date 
 * @ return 
 */
function extractDate (date){
    // j'instancie l'objet date
    const dateObjet = new Date(date);
    // numero du jour dans la semaine
    const numeroJourSemaine = dateObjet.getDay();
    // numero du jours dans le mois
    const numeroJourDuMois = dateObjet.getDate();
    // numero du mois (pourquoi + 1 ????)
    const numeroDuMois = dateObjet.getMonth()+1;
    //annee
    const annee = dateObjet.getFullYear();
    // heures
    const heures = dateObjet.getHours();
    // minutes
    const minutes = dateObjet.getMinutes();
  
    // appel de la fonction reecriture date au format lundi 02 fevrier 2024
    let newFormatDate = rewriteDate (numeroJourSemaine, numeroJourDuMois,  numeroDuMois, annee );
    // return new format date et hour 
    return newFormatDate
   
}

/**
 * reecrit la date au format lundi 24 fecrier 2024
 * 
 * @param {number} jourSemaine 
 * @param {number} JourDuMois 
 * @param {number} mois 
 * @param {number} annee 
 * @returns la nouvelle date reecrite au format lundi 24 fecrier 2024
 */
function rewriteDate (jourSemaine, JourDuMois,  mois, annee) {

    // tableau des jours de la semaine
   let tabJoursSemaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    // tableau des mois
   const tabMois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
   
   // à la position jourSemaine je recupere la valeur
   let jourCurrent = tabJoursSemaine[jourSemaine-1];
   // à la position mois je recupere la valeur
   let moisCurrent = tabMois[mois-1];
    // construction de la date au nouveau format
    newFormatDate = jourCurrent +" "+ JourDuMois +" "+ moisCurrent +" "+ annee;
    //retourne new format date
    return newFormatDate;
}

/**
 * extrait les donnée de l(heure de la date
 * @param {*} date 
 * @returns rtourne les donnée au nouveau format
 */
function extractHour (date){
    // j'instancie l'objet date
    const dateObjet = new Date(date);
    // heures
    const heures = dateObjet.getHours();
    // minutes
    const minutes = dateObjet.getMinutes();
    let newMinutes;

    let newFormatHour
    if (minutes == 0) {
        let newMinutes = " ";
        // appel de la fonction reecriture l'heure au format 00h00
        newFormatHour = rewriteHoure (heures,newMinutes);
        // return new format  hour 
    } else { 
    console.log(minutes);
    // appel de la fonction reecriture l'heure au format 00h00
    newFormatHour = rewriteHoure (heures,minutes);
    // return new format  hour 
    }
    return newFormatHour   
}

/**
 * reecriture e l'heure au format 00h00
 * @param {number} heures 
 * @param {number} minutes 
 * @returns l'heure au format 00h00
 */
function rewriteHoure (heures, minutes){
    newFormatHour = heures +"h"+ minutes;
    return newFormatHour;
}


