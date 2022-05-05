const joursSemaine = ['lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
let option = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', option);


jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));

console.log("ici : "+tabJoursEnOrdre);

//export default tabJoursEnOrdre;