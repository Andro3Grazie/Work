// COSTANTI -> Far si che si prendano in input (magari da un file di configurazione) per renderlo scalabile
const idTurno = 40;
const nTurni = soste.length;
const nNominativi = nominativi.length;
const primaSosta = soste[33 - 1];
const primoGiorno = "04/01/2021"; // Formato -> mm/gg/aaaa (Tanto si dovrà prendere in input)

// VARIABILI
var turno = []; // Dove sono di turno oggi
var dataOggi = new Date();
var ricercaFatta = '';

// Manda in esecuzione il tutto :)
main();




// Apri il campo di ricerca
function apriRicerca() {
    $('#turno').slideUp();
    $('.nav').slideUp('fast');
    $('#chiudiRicerca').show();
    $('#listaSoste').slideDown();
    $('#nuovaRicerca').hide();
    $('#pulisciRicerca').hide();
    $('#risultato').hide();
    $("#inputSoste").prop("value", ricercaFatta).prop("disabled", false).focus();
    $('footer').hide();
    chiudiBoxScelta();

    if (ricercaFatta == '') {
        $('#listaSoste').html('');
        $('#sceltaRicerca').slideDown();
    }
    
    // Prendere gli input da tastiera per la ricerca live
    $('#inputSoste').bind('click keyup', function () {
        // Prendi quello che scrivi in input -> $(this).val();

        // Se il campo di ricerca non è vuoto fai vedere solo i risultati giusti
        if ($(this).val() != '') {
            $('#sceltaRicerca').slideUp();
        }
        // Altrimenti mostra la scelta di ricerca
        else {
            $('#sceltaRicerca').slideDown();
        }
        
        $('#listaSoste').html('');
        risultatiRicerca($(this).val());
        ricercaFatta = $(this).val();
    });
}

// Chiudi (Pulsante)
function chiudiTutto() {
    $('#turno').slideDown();
    $('.nav').slideDown('fast');
    $('#chiudiRicerca').hide();
    $('#listaSoste').slideUp('slow');
    $('footer').show();

    chiudiBoxScelta();
    $('#sceltaRicerca').slideUp();
    $("#inputSoste").prop("value", '');
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
}
// Chiudi i risultati di ricerca
function chiudiRisultatiRicerca() {
    $('#turno').slideDown();
    $('.nav').slideDown('fast');
    $('#chiudiRicerca').hide();
    $('#listaSoste').slideUp('slow');

    $('#nuovaRicerca').show();
    $('#pulisciRicerca').show();

    $('#risultato').show();

    $('footer').show();

    chiudiBoxScelta();
    $('#sceltaRicerca').slideUp();
}


