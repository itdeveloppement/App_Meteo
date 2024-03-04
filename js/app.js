
    // variables globales 
        // tableau classe picto et tendence meteo
    let tabPictos = { 
        //Clear sky
            0: ["pictoSoleil", "pictoSoleilW90","Ciel clair"],
        //Mainly clear, partly cloudy, and overcast
            1: ["pictoCouvertSoleil", "pictoCouvertSoleilW90","Principalement clair, partiellement nuageux et couvert"],
            2: ["pictoCouvertSoleil", "pictoCouvertSoleilW90","Principalement clair, partiellement nuageux et couvert"],
            3: ["pictoCouvertSoleil", "pictoCouvertSoleilW90","Principalement clair, partiellement nuageux et couvert"],
        // Fog and depositing rime fog
            45:["pictoCouvertSoleil", "pictoCouvertSoleilW90","Brouillard et dépôt de brouillard"],
            48: ["pictoCouvertSoleil", "pictoCouvertSoleilW90","Brouillard et dépôt de brouillard"],
        // Drizzle (bruine): Light, moderate, and dense intensity
            51: ["pictoCouvert", "pictoCouvertW90","Bruine: intensité légère, modérée et dense"],
            53: ["pictoCouvert", "pictoCouvertW90","Bruine: intensité légère, modérée et dense"],
            55: ["pictoCouvert", "pictoCouvertW90","Bruine: intensité légère, modérée et dense"],
        // Freezing (verglacante) Drizzle: Light and dense intensity
            56: ["pictoPluie", "pictoPluieW90","Bruine verglacante: intensité légère, modérée et dense"],
            57: ["pictoPluie", "pictoPluieW90","Bruine verglacante: intensité légère, modérée et dense"],
        // Rain: Slight, moderate and heavy intensity
            61: ["pictoOrage", "pictoOrageW90","Pluie: intensité légère, modérée et forte"],
            63: ["pictoOrage", "pictoOrageW90","Pluie: intensité légère, modérée et forte"],
            65: ["pictoOrage", "pictoOrageW90","Pluie: intensité légère, modérée et forte"],
        // Freezing Rain: Light and heavy intensity
            66: ["pictoOrage", "pictoOrageW90","Pluie verglacante: intensité légère et forte"],
            67: ["pictoOrage", "pictoOrageW90","Pluie verglacante: intensité légère et forte"],
        // Snow fall: Slight, moderate, and heavy intensity
            71: ["pictoNeige", "pictoNeigeW90","Neige: intensité légère et forte"],
            73: ["pictoNeige", "pictoNeigeW90","Neige: intensité légère et forte"],
            75: ["pictoNeige", "pictoNeigeW90","Neige: intensité légère et forte"],
        // Snow grains
            77: ["pictoNeige", "pictoNeigeW90","Neige: intensité forte"],
        // Rain showers: Slight, moderate, and violent
            80: ["pictoPluie", "pictoPluieW90","Averses: légères, modérées et violentes"],
            81: ["pictoPluie", "pictoPluieeW90","Averses: légères, modérées et violentes"],
            82: ["pictoPluie", "pictoPluieW90","Averses: légères, modérées et violentes"],
        // Snow showers slight and heavy
            85: ["pictoNeige", "pictoNeigeW90","Neige légères et lourdes"],
            85: ["pictoNeige", "pictoNeigeW90","Neige légères et lourdes"],
        // Thunderstorm: Slight or moderate
            "95*": ["pictoOrage", "pictoOrageW90","Léger ou modéré"],
        // Thunderstorm with slight and heavy hail
            96: ["pictoOrage", "pictoOrageW90","Orage avec grêle légère et forte"],
            "99*": ["pictoOrage", "pictoOrageW90","Orage avec grêle légère et forte"],

    }
    // recuperation de la geolocalisation
    
    // La méthode Geolocation.getCurrentPosition() fournit la position actuelle de l'appareil.
    // on applique la methode sur le navigateur qui prend la fonction position comme argument
    navigator.geolocation.getCurrentPosition(position => {
        // sur l'objet position on recupere la latitude et la longitude 
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // appel de la fonction fetch via la fonction url
        // asynchrone : tant que les données ne sont pas disponibles la suite n'est pas executé
        meteoCurrent(latitude, longitude);
        },
        );   
    /** recupération des données open meteo via fonction fetch/json
     * 
     * @param {number} latitude 
     * @param {number} longitude 
     */
    function meteoCurrent(latitude, longitude) { 
        console.log(longitude);
    // recuperation des données meteo à la position current du navigateur via application open meteo au format json

    /*
    console.log(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,temperature_2m,precipitation,is_day,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=weather_code,temperature_2m,rain,cloud_cover,wind_speed_80m,wind_direction_80m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum&timezone=auto`);
*/

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,temperature_2m,precipitation,is_day,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=weather_code,temperature_2m,rain,cloud_cover,wind_speed_80m,wind_direction_80m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum&timezone=auto`)

    .then (responseMeteo=>{
        return responseMeteo.json();
    })
    .then (responseMeteo=>{

        shwo(responseMeteo);
        
    })


    console.log(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=code,nom,codesPostaux,surface,population,centre,contour`)


      // recuperation de la ville dans l'application geo.api.gouc.fr en fonction des coordonnées current du navigateur
    fetch(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=code,nom,codesPostaux,surface,population,centre,contour`)
    
    .then(responseVille=>{
        return responseVille.json();
    })
    .then(responseVille=>{
        shwoLieu(responseVille);
    })
}
function shwo (response) {
    
    // temperature current du jour
    let currentTemperatureMax = response.daily.temperature_2m_max[0];
    let currentTemperatureMin = response.daily.temperature_2m_min[0];
    // vitesse du vent et direction
    let currentVitesseVent = response.current.wind_speed_10m;// wind_speed_10m
    let currentDirectionVent = response.current.wind_direction_10m;
    // type de temps
    let currentTypeWeather = response.current.weather_code; // weather_code
   
    // affichage
    shwoDateHeureCurrent();
    shwoTemperatureTempsJour(currentTypeWeather, currentTemperatureMax, currentTemperatureMin);
    shwoVitesseDirectionVent(currentVitesseVent, currentDirectionVent);
    showMeteoUneHeure(response)
    showMeteoJournee(response)
}
/** recuperation en temps reel de la date et heure dans le navigateur et extrait les données 
 * 
 */
function shwoDateHeureCurrent(){
    // ciblage
    let datetime = document.querySelector(".date-heure")
    // instentiation objet date
    let dateObjet = new Date();

    // extraire l'heure sous forme de chaîne de caractères  00:00:00
    let time = dateObjet.toLocaleTimeString();

    // joursdans la semaine
    const numeroJourSemaine = dateObjet.getDay();
    // numero du jours dans le mois
    const numeroJourDuMois = dateObjet.getDate();
    // numero du mois (pourquoi + 1 ????)
    const numeroDuMois = dateObjet.getMonth()+1;
    
    let newFormatDate = formateDate (numeroJourSemaine, numeroJourDuMois, numeroDuMois);

    datetime.innerHTML = `
    <h2>${newFormatDate} - ${time}</h2>
    `;
    
    // pour planifier l'exécution de la fonction avant le prochain rafraîchissement de l'écran. Cela permet d'obtenir une mise à jour fluide de l'heure en temps réel.
   requestAnimationFrame(shwoDateHeureCurrent);
}

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
    let newFormatDate = formateDate (numeroJourSemaine, numeroJourDuMois,  numeroDuMois, annee );
    // return new format date et hour 
    return newFormatDate
   
}

/** re-ecriture de la date au format type jour - numero jour - mois - année
 * 
 * @param {number} jourSemaine 
 * @param {number} jourDuMois 
 * @param {number} mois 
 * @param {number} annee 
 * @returns newFormatDate
 */
function formateDate (jourSemaine, jourDuMois, mois ) {
    // tableau des jours de la semaine
   let tabJoursSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    // tableau des mois
   const tabMois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
   // à la position jourSemaine je recupere la valeur
   let jourCurrent = tabJoursSemaine[jourSemaine];
   // à la position mois je recupere la valeur
   let moisCurrent = tabMois[mois-1];
    // construction de la date au nouveau format
    let formatDate = jourCurrent +" "+ jourDuMois +" "+ moisCurrent;
    // Premiere lettre du jour en majuscule
   let newFormatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
    //retourne new format date
    return newFormatDate;
}
/** extrait les donnée de l'heure de la date
 * 
 * @param {*} date 
 * @returns rtourne les donnée au nouveau format
 */
function formatHour (date){
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
/*** afficher du lieu du navigateur geolocalisé
 * 
 * @param {} // parametre 
 * 
 */
function shwoLieu (ville){
    
    // ciblage
    let zoneLieu = document.querySelector(".jour-ou-nuit");
    // recuperation des données à afficher
    let villeCurrent = positionVille(ville);
    // declaration template
    let template = '';
    // creation html et insertion donnée
    template = `
    <h1>${villeCurrent} </h1>
    `
    // insertion dans le DOM
    zoneLieu.innerHTML = template;
}
/** re-ecriture nom de la ville avec code postal
 * 
 * @param {*} ville 
 * @returns formateVille
 */
function positionVille(ville) {
    // recuperation des données nom
    let nomlVille = ville[0].nom;
    // ecrture ville et code postal
    let formateVille = `${nomlVille}`;
    return formateVille;
}
/*** afficher le temps et la temperature actuelle
 * afficher le temps et la temperature actuelle
 * @param {} // type de temps
 * @param {} // temperature
 */
function shwoTemperatureTempsJour (typeWeather, temperatureMax, temperatureMin){
    // affichager le picto
    let chaine = typeWeather.toString();
    let classPicto = tabPictos[chaine][1];
    // tantance meteo
    let tendanceMeteo = tabPictos[chaine][2];

    // je cible ma zone
    let zone = document.querySelector(".temps-Temperature-jour");
    // je declare mon template
    let template = ``;
    // je definit les elt html et donnee
    template = `
    <div class="pictoWeitherW90 ${classPicto}"></div>
    <div>
        <h3>Tendance de la journée</h3>
        <p>${tendanceMeteo}</p>
        <p>T° max : ${temperatureMax} °C</p>
        <p>T° min : ${temperatureMin} °C</p>
    </div>
    `
    // je 'ajoute au dom
    zone.innerHTML = template;
}
/*** afficher la vitesse et direction du vent
 * afficher la vitesse et direction du vent
 * @param {} // vitesse
 * @param {} // direction du vent
 *  
 * 
 */
function shwoVitesseDirectionVent (vitesseVent, directionVent){

    // je cible ma zone
    let zone = document.querySelector(".vent");
    // je declare mon template
    let template = ``;
    // je definit les elt html et donnee
    template = `
    <div class="compass">
        <div class="compass-arrow">
            <img src="./img/compass-arrow.png" alt="">
        </div>
    </div>
    <div>
        <h3>Vitesse et direction du vent</h3>
        <p>Vitesse du vent : ${vitesseVent} km/h</p>
    </div>
    `
    // je 'ajoute au dom
    zone.innerHTML = template;

    //  anmation de la bousolle
    rotationArrow(directionVent) 

}
/** affiche la direction du vent
 * 
 * @param {*} directionVent 
 */
function rotationArrow (directionVent){
    // je cible l'element a faire tourner
    let arrow = document.querySelector(".compass-arrow");
    // appliquer la translattion en css pour positionner la flche au milieur transform tranbslate
    // en dure avec le style j'applique la rotation à l'element et je suis obliger de le repositionner au milieu apres le rotation avec a nouveau un translate
   arrow.style.transform = "translate(-50%, -50%) rotate(" + directionVent + "deg)";
   
}
/**meteo sur une heure : recupere les données / integre les donnees au html et modifit le DOM
 * meteo sur une heure : recupere les données / integre les donnee au html et modifit le DOM
 * @param {Objet} objetResponse 
 */
function showMeteoUneHeure(objetResponse){

// j'ai besoin de :
let heure;
let temperature;
let precipitation

// je cible ma zone hors de la boucle
let zone = document.querySelector(".carousel-slides");
// je declare mon template hors de la boucle
let template = ``;

// j'extrait les donnes de l'objet et je creer pour chaque cle les element du dom
for (let i = 0; i < 24; i++) {
// extracton des données pour une heure

    // date => heure current
   dateCurent = objetResponse.hourly.time[i];
   heureCurrent = formatHour (dateCurent);
    // date => heure current + une heure
    dateCurrentPlusUneHeure = objetResponse.hourly.time[i+1];
    heurePlusUneHeure = formatHour (dateCurrentPlusUneHeure);
   // temperature
   temperature = objetResponse.hourly.temperature_2m[i];
   // precipitation
   precipitation = objetResponse.hourly.rain[i];

// construction du DOM
// je definie les elt html et j'integre les donnees
    template += `
    <div class="carousel-item carousel-item24Heures">
    <h4>${heureCurrent} à ${heurePlusUneHeure}</h4>
        <div >
            <div>
                <img src="./img/thermometer.png" alt="">
            </div>
            <p>${temperature} °C</p>
        </div>
        <div class="precipitation">
            <div>
                <img src="./img/umbrella.png" alt="">
            </div>
            <p>${precipitation} mm</p>
        </div>
        
    </div>
    `
}
// ajout au DOM
    zone.innerHTML = template;
}
/** meteo sur une journee : recupere les données / integre les donnees au html et modifit le DOM
 * meteo sur une journee : recupere les données / integre les donnee au html et modifit le DOM
 * @param {Objet} objetResponse 
 */
function showMeteoJournee(objetResponse) {
    // je cible ma zone hors de la boucle
    let zone = document.querySelector(".prevision-sur-sept-jours .carousel-slides");
    // je declare mon template hors de la boucle
    let template = ``;

    // j'extrait les donnes de l'objet et je creer pour chaque cle les element du dom
    for (let i = 1; i < 7; i++) {
    // extracton des données pour une heure
    
    // date
    let dateJour = objetResponse.daily.time[i];
    console.log(dateJour);
    let date = extractDate(dateJour);
    // temperature du jour
    let temperatureMax = objetResponse.daily.temperature_2m_max[i];
    let temperatureMin = objetResponse.daily.temperature_2m_min[i];
    // class du picto
    let TypeWeather = objetResponse.daily.weather_code[i]
    let chaine = TypeWeather.toString();
    let classPicto = tabPictos[chaine][1];
    // dentence meteo
    let tendenceMeteo = tabPictos[chaine][2];

    // construction du DOM
    // je definie les elt html et j'integre les donnees
    template += `
    <div class="carousel-item carousel-item6Jours">
        <h4>${date}</h4>
        <p>${tendenceMeteo}</p>
        <div>
            <div class="pictoWeitherW90 ${classPicto}"></div>
        </div>
        <p>T° de ${temperatureMin} à ${temperatureMax} °C</p>
    </div>
    `
    }
    // ajout au DOM
    zone.innerHTML = template;

}
/*** afficher l'intitulé du temps (ex ensoleillé) en fonction du type de temps
 * afficher l'intitulé du temps (ex ensoleillé) en fonction du type de temps
 * @param {} // type de temps
 * 
 */
function showTypeWeatherText(currentTypeWeather){
    // rechercher dans le tableu la class du picto corespondant au currentTypeWeather
   // retourner la classe à appliquer
    // tableau currentTypeWeather / adresse URL 
    let tabPictos = { 
    //Clear sky
        0: "Clear sky",
    //Mainly clear, partly cloudy, and overcast
        1: "Mainly clear",
        2: "Mainly clear",
        3: "Mainly clear",
    // Fog and depositing rime fog
        45: "Fog",
        48: "pFog",
    // Drizzle: Light, moderate, and dense intensity
        51: "Drizzle",
        53: "Drizzle",
        55: "Drizzle",
    // Freezing Drizzle: Light and dense intensity
        56: "Freezing",
        57: "Freezing",
    // Rain: Slight, moderate and heavy intensity
        61: "Rain",
        63: "Rain",
        65: "Rain",
    // Freezing Rain: Light and heavy intensity
        66: "Freezing Rain",
        67: "Freezing Rain",
    // Snow fall: Slight, moderate, and heavy intensity
        71: "Snow fall",
        73: "Snow fall",
        75: "Snow fall",
    // Snow grains
        77: "Snow grains",
    // Rain showers: Slight, moderate, and violent
        80: "Rain showers",
        81: "Rain showers",
        82: "Rain showers",
    // Snow showers slight and heavy
        85: "Snow showers slight",
        86: "Snow showers slight",
    // Thunderstorm: Slight or moderate
        "95*": "Thunderstorm",
    // Thunderstorm with slight and heavy hail
        96: "Thunderstorm",
        "99*": "Thunderstorm",
    };
    let chaine = currentTypeWeather.toString();
    TypeWeather = tabPictos[chaine];
    return TypeWeather;
}
