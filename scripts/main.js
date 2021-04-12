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

// Runna il sito :)
main();



// function impostaSosta() {
//     $('#turno').html(`
//         <div class="carousel-item active">
//             <span class="d-inline h2 mb-0" style="font-family: 'Rubik', sans-serif; font-weight: 500;">
//                 ...
//             </span>
//         </div>
//     `);
//     applicaSosta();
// }

function applicaSosta() {
    
    var modal = new bootstrap.Modal(document.getElementById('impostaSosteModal'));
    modal.toggle();
    
    $('#inputImpostaSoste').val('').focus();
    $('#impostaListaSosta').html('');

    // Prendere gli input da tastiera per la ricerca live
    $('#inputImpostaSoste').bind('click keyup', function () {
        // Prendi quello che scrivi in input -> $(this).val();
        var val = $(this).val();

        // Se il campo di ricerca non è vuoto fai vedere solo i risultati giusti
        if (val!= '') {
            $("#impostaListaSosta").html('');
        }
        // Altrimenti mostra la scelta di ricerca
        else {
            $("#impostaListaSosta").html('');
        }
        var k = 0;
        var nada = true;
        for (let i = 0; i < soste.length && k < 2; i++) {
            // Risultati live
            if (soste[i]["nome"].toUpperCase().trim().includes(val.toUpperCase().trim()) && val != '') {
                
                nada = false;
                k +=1; 

                $('#impostaListaSosta').append(`
                    <div class="card" onclick="impostaApplicaSosta(${soste[i]["id"]}, '${soste[i]["nome"]}');">
                        <div class="card-body">
                            <div class="row">                    
                                <div class="col-2">
                                    ${soste[i]["id"]}
                                </div>
                                <div class="col-auto">
                                    ${soste[i]["nome"]}
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
        if (nada && val != '') { // La ricerca non ha prodotto risultati :(
            $('#impostaListaSosta').append(`
                <div class="card">
                    <div class="card-body text-center">
                        <p class="h5">La ricerca non ha prodotto alcun risultato</p>
                    </div>
                </div> 
            `);
        }
    });  
}
// Imposta la sosta scelta
function impostaApplicaSosta(id, nome) {
    // console.log(id + " " + nome, " | ", soste[id - 1]["id"] + " " + soste[id - 1]["nome"] );
    turno["id"] = soste[id - 1]["id"];
    turno["nome"] = soste[id - 1]["nome"];
    stampaCalendario();
    
    $('#nuovaRicerca').hide();
    $('#risultato').hide();
    $("#inputSoste").prop("value", '').prop("disabled", false);
    $('#impostaSosteModal').modal('hide');
}
// Apri il campo di ricerca
function apriRicerca() {
    $('#turno').slideUp();
    $('.nav').slideUp('fast');
    $('#chiudiRicerca').show();
    $('#listaSoste').slideDown();
    $('#nuovaRicerca').hide();
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
            $("#listaSoste").html('');
            $('#sceltaRicerca').slideUp();
        }
        // Altrimenti mostra la scelta di ricerca
        else {
            $("#listaSoste").html('');
            $('#sceltaRicerca').slideDown();
        }

        risultatiRicerca($(this).val());
        ricercaFatta = $(this).val();

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
                        <div class="row">                    
                            <div class="col-2">
                                ${soste[i]["id"]}
                            </div>
                            <div class="col-auto">
                                ${soste[i]["nome"]}
                            </div>
                        </div>
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
                    <div class="card-body">\
                        <div class="row">
                            <div class="col-2">
                                ${nominativi[i]["id"]}
                            </div>
                            <div class="col-auto">
                                ${nominativi[i]["nome"]}
                            </div>
                        </div>
                    </div>
                </div>       
            `);
        }
    }
    if (val.trim().toLowerCase() == 'virgil') {
        $('#listaSoste').append(`
            <div class="card">
                <div class="card-body text-center">
                    <p class="display-2">ฅ^•ﻌ•^ฅ</p>
                    <p class="h4 mb-0">BAVA VIRGIL</p>
                    <p class="fs-6">Ora torna a lavoro!</p>
                </div>
            </div> 
        `);
    }
    else if (nada && val != '') { // La ricerca non ha prodotto risultati :(
        $('#listaSoste').append(`
            <div class="card">
                <div class="card-body text-center">
                    <p class="display-2">(&#62;_&#60;)</p>
                    <p class="h5">La ricerca non ha prodotto alcun risultato</p>
                </div>
            </div> 
        `);
    }
    if (val.trim().toLowerCase() == 'charly') { // Giochino per papà
        // da fare )
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
    $('#risultato').show();

    $('footer').show();

    chiudiBoxScelta();
    $('#sceltaRicerca').slideUp();
}

// Mostra il nome di chi sta a quella sosta
function dimmiChi(id, nome) { // Fanno riferimento alle informazioni della sosta dove voglio andare

    chiudiRisultatiRicerca();
    var idNominativo = 0;

    // idTurno = 40 (fisso), il tunro["id"] cambia giorno per giorno e l'id è della sosta su cui ho cliccato
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
// Mostra la sosta dove sta quel nominativo
function dimmiDove(id, nome) {

    chiudiRisultatiRicerca();
    var idSoste = 0;

    idSoste = turno["id"] - ( idTurno - id );
    if ( idSoste < 1 )
        idSoste += 95;

    // console.log(idTurno, ( turno["id"] - id ), idSoste);

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
