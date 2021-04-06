// 1 day = 24 hours in a day × 60 minutes in an hour × 60 seconds in a minute = 86400 seconds in a day
// current date (in milliseconds) -> Date.now();
// time zone differences in minutes -> date.getTimezoneOffset();

const idTurno = 40;
var primaSosta = soste[33 - 1];
var primoGiorno = "04/01/2021"; // Formato -> mm/gg/aaaa

var turno = []; // Dove sono di turno oggi

var date = new Date(primoGiorno); // Imposta primoGiorno come data
var milliseconds = date.getTime(); // Trasformala in millisecondi
var fusoOrario = (Math.abs(date.getTimezoneOffset())) * 60 * 1000; // Calcola il fuso orario
var primoGiornoMs = milliseconds + fusoOrario; // Aggiungi il fuso orario alla data in millisecondi

// Imposta la data attuale 
var d = new Date();
// Aggiunge uno "0" davanti al giorno e al mese, qualunque sia il loro valore prende le ultime due cifre
// (es.1: "0" + (giorno =) 10 -> 010 [slice(-2)] -> 10, es.2: "0" + (giorno =) 3 -> 03 [slice(-2)] -> 03)
var data = (("0" + d.getDate()).slice(-2)) + "/" + ("0" + (d.getMonth() + 1)).slice(-2); // Senza anno

// Se è un giorno festivo non calcolare nulla 
if (d.getDay() == 0 || giorniFestiviFissi.includes(data) || giorniFestiviVariabili.includes(data + "/" + d.getFullYear()))
    document.getElementById("turno").innerHTML = "Oggi siete di turno sotto le coperte";
else {
    controllaTurno();
    document.getElementById("turno").innerHTML = titleCase(turno["nome"]);
}

// Mostra il box delle soste
function mostraSoste() {
    if ($('#apriSoste').css('display') != 'none') {
        $('#apriSoste').hide();
        $('#chiudiSoste').show();
        $('#nominativiBox').slideUp();
        listaSosteCompleta();
        $('footer').hide();
    }
    else {
        $('#listaSoste').html('');
        $('#apriSoste').show();
        $('#chiudiSoste').hide();
        $('#nominativiBox').slideDown();
        $('footer').show();
    }
}
// Mostra il box dei nominativi
function mostraNominativi() {
    if ($('#apriNominativi').css('display') != 'none') {
        $('#apriNominativi').hide();
        $('#chiudiNominativi').show();
        $('#sosteBox').slideUp();
        listaNominativiCompleta();
        $('footer').hide();

    }
    else {
        $('#listaSoste').html('');
        $('#apriNominativi').show();
        $('#chiudiNominativi').hide();
        $('#sosteBox').slideDown();
        $('footer').show();
    }
}
// Apri il campo di ricerca
function apriRicerca() {
    $('#turno').slideUp();
    $('.nav').slideUp('fast');
    $('#chiudiRicerca').show();
    $('#listaSoste').slideDown();
    $('#nuovaRicerca').hide();
    $('#risultato').hide();
    $("#inputSoste").prop("value", '').prop("disabled", false);

    $('#listaSoste').html('');
    $('#sceltaRicerca').slideDown();

    // Ricerca delle soste live
    $('#inputSoste').bind('click keyup', function () {
        // Prendi quello che scrivi in input -> $(this).val();

        // Se il campo di ricerca non è vuoto fai vedere solo i risultati giusti
        if ($(this).val() != '') {
            $("#listaSoste").html('');
            $('#sceltaRicerca').slideUp();
        }
        // Altrimenti mostra la scelta di ricerca
        else {
            $("#listaSoste").html('');
            $('#sceltaRicerca').slideDown();
        }

        risultatiRicerca($(this).val());

    });
}
// Sistema di ricerca
function risultatiRicerca(val) {

    var nada = true;

    for (let i = 0; i < soste.length; i++) {
        // Risultati live
        if (soste[i]["nome"].toUpperCase().trim().includes(val.toUpperCase().trim()) && val != '') {

            nada = false;

            $('#listaSoste').append(`
                <div class="card" onclick="dimmiChi(${soste[i]["id"]}, '${soste[i]["nome"]}');">
                    <div class="card-body">
                        ${soste[i]["nome"]}
                    </div>
                </div>       
            `);
        }
    }
    for (let i = 0; i < nominativi.length; i++) {
        // Risultati live
        if (nominativi[i]["nome"].toUpperCase().trim().includes(val.toUpperCase().trim()) && val != '') {

            nada = false;

            $('#listaSoste').append(`
                <div class="card" onclick="dimmiDove(${nominativi[i]["id"]}, '${nominativi[i]["nome"]}');">
                    <div class="card-body">
                        ${nominativi[i]["nome"]}
                    </div>
                </div>       
            `);
        }
    }
    if (nada && val != '') { // La ricerca non ha prodotto risultati :(
        $('#listaSoste').append(`
            <div class="card">
                <div class="card-body text-center">
                    <p class="display-2">(&#62;_&#60;)</p>
                    <p class="h5">La ricerca non ha prodotto alcun risultato</p>
                </div>
            </div> 
        `);
    }
}
// Mostra la lista delle soste completa
function listaSosteCompleta() {
    for (let i = 0; i < soste.length; i++) {
        $('#listaSoste').append(`
            <div class="card" onclick="dimmiChi(${soste[i]["id"]}, '${soste[i]["nome"]}');">
                <div class="card-body">
                    ${soste[i]["nome"]}
                </div>
            </div>       
        `);
    }
}
// Mostra la lista dei nomi completa
function listaNominativiCompleta() {
    for (let i = 0; i < soste.length; i++) {
        $('#listaSoste').append(`
            <div class="card" onclick="dimmiDove(${nominativi[i]["id"]}, '${nominativi[i]["nome"]}');">
                <div class="card-body">
                    ${nominativi[i]["nome"]}
                </div>
            </div>       
        `);
    }
}
// Chiudi (Pulsante)
function chiudiTutto() {
    $('#turno').slideDown();
    $('.nav').slideDown('fast');
    $('#chiudiRicerca').hide();
    $('#listaSoste').slideUp('slow');
    $('footer').show();

    chiudiBoxScelta();
}
// Chiudi box scelta liste (soste e nominativi)
function chiudiBoxScelta() {
    // Resetta il box di scelta
    if ($('#apriSoste').css('display') == 'none') {
        $('#apriSoste').show();
        $('#chiudiSoste').hide();
        $('#nominativiBox').slideDown();
    }
    if ($('#apriNominativi').css('display') == 'none') {
        $('#apriNominativi').show();
        $('#chiudiNominativi').hide();
        $('#sosteBox').slideDown();
    }
    $('#sceltaRicerca').slideUp();
}
// Chiudi i risultati di ricerca
function chiudiRisultatiRicerca() {
    $('#turno').slideDown();
    $('.nav').slideDown('fast');
    $('#chiudiRicerca').hide();
    $('#listaSoste').slideUp('slow');

    $('#nuovaRicerca').show();
    $('#risultato').show();

    $('footer').show();

    chiudiBoxScelta();
}
// Da sistemare -> mostra il nome di chi sta a quella sosta
function dimmiChi(id, nome) { // Fanno riferimento alle informazioni della sosta dove voglio andare

    chiudiRisultatiRicerca();
    var idNominativo = 0;

    idNominativo = idTurno - (turno["id"] - id);
    if (idNominativo > 95)
        idNominativo -= 95;

    // console.log(idTurno, ( turno["id"] - id ), idNominativo);

    $("#inputSoste").prop("value", nome).prop("disabled", true);
    document.getElementById("risultato").innerHTML = `
        <div class="card">
            <div class="card-body" >
               ${nominativi[idNominativo - 1]["nome"]}
            </div>
        </div>
    `;
}
// Da sistemare -> mostra la sosta dove sta quel nominativo
function dimmiDove(id, nome) {

    chiudiRisultatiRicerca();
    var idSoste = 0;

    idSoste = turno["id"] - ( idTurno - id );
    if ( idSoste < 1 )
        idSoste += 95;

    console.log(idTurno, ( turno["id"] - id ), idSoste);

    // var idSoste = (idTurno - id) - (soste[(primaSosta["id"] - 1) + (giorniLavorativi - count)]["id"]);

    // console.log(id, nome, Math.abs(idSoste));

    $("#inputSoste").prop("value", nome).prop("disabled", true);
    document.getElementById("risultato").innerHTML = `
        <div class="card">
            <div class="card-body" >
            ${soste[idSoste - 1]["nome"]}
            </div>
        </div>
    `;
}
// Capitalizza le prime lettere di ogni parola
function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}
// stampa dove sono di turno
function controllaTurno() {

    var giorniLavorativi = Math.floor(((Date.now() + fusoOrario) - primoGiornoMs) / 1000 / 60 / 60 / 24);

    data += ("/" + d.getFullYear()); // Aggiungi l'anno alla data

    var count = 0; // Contatore per i giorni non lavorativi

    for (let i = 0; i < domeniche.length; i++) {

        // Il mese è minore/uguale di quello attuale (dello stesso anno)
        if (domeniche[i].substring(3, 5) <= data.substring(3, 5) && domeniche[i].substring(6) == data.substring(6)) {

            // il giorno è minore/uguale di quello attuale
            if (domeniche[i].substring(0, 2) <= data.substring(0, 2)) {

                // Aggiungi una domenica
                count += 1;
            }
        }
    }

    // Conta le Feste
    for (let i = 0; i < (giorniFestiviFissi.length + giorniFestiviVariabili.length); i++) {

        // Il mese è minore/uguale di quello attuale (dello stesso anno)
        if (feste[i].substring(3, 5) <= data.substring(3, 5) && feste[i].substring(6) == data.substring(6)) {

            // il giorno è minore/uguale di quello attuale
            if (feste[i].substring(0, 2) <= data.substring(0, 2)) {

                // Controlla solo se una delle festività è domenica
                if (!domeniche.includes(feste[i])) {

                    // Aggiungi un giorno di festa
                    count += 1;
                }

            }
        }
    }

    turno["nome"] = soste[(primaSosta["id"] - 1) + (giorniLavorativi - count)]["nome"];
    turno["id"] = soste[(primaSosta["id"] - 1) + (giorniLavorativi - count)]["id"];
} // Fine calcolo del turno

function togliFooterMobile() {
    if(window.mobileCheck == true) {
        $('footer').hide();
    }
}
function rimettiFooterMobile() {
    if(window.mobileCheck == true) {
        $('footer').show();
    }
}

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

