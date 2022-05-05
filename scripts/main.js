/*import tabJoursEnOrdre from '.gestionTemps';*/

console.log("la : "+tabJoursEnOrdre);

const CLEFAPI = 'fe0c5b1bc4a0864724a1950303c6ad5e';
let resultatsAPI;


const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');
const description = document.querySelectorAll('.description');


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {

        console.log("position : "+position);

        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);

    }, () => {
        alert('Vous avez refusé la géolocalisation !')
    })
}

function AppelAPI(long, lat) {
    
console.log(`https:api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`);

    fetch(`https:api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {

        resultatsAPI = data;

        console.log(data);

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
        localisation.innerText = resultatsAPI.timezone;

        //les heures par tranche de 3 avec leur températures:

        let heureActuelle = new Date().getHours();

console.log(heure);
console.log("len : "+heure.length);

        for(let i = 0; i < heure.length; i++){

            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr -24} h`;
            } else if(heureIncr === 24){
                heure[i].innerText= "00 h"
            } else { 
                    heure[i].innerText = `${heureIncr} h`;
            }
        }

console.log(tempPourH);
console.log("len : "+tempPourH.length);
        //temp pour 3h
        for(let j =0; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${resultatsAPI.hourly[j * 3].temp}°`
        }

        //trois première lettre des jours 
console.log(joursDiv);
console.log("len : "+joursDiv.length);
        for(let k=0; k< tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
        }

        // Température 
console.log(tempJoursDiv);
console.log("len : "+tempJoursDiv.length);
        for(let m= 0; m < 7; m++){
        tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
        }

        //Description
        for(let m= 0; m < 7; m++){
            description[m].innerText = `${(resultatsAPI.current.weather[0].description)}`
            }

        //logo dynamique
        if(heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
        }else {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparition');
    })
}