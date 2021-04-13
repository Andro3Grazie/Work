// Funzione principale 
function main() {
    controllaTurno();
    stampaCalendario();
    controlloCarosello();

    // se è un giorno festivo calcola lo stesso ma stampa come `active` del carousel che si sta sotto le coperte [DA_RIFARE]
    if ( dataOggi.getDay() == 0 || (feste.includes( ("0" + dataOggi.getDate()).slice(-2) + "/" + ("0" + (dataOggi.getMonth() + 1)).slice(-2) ) )) { // Se non è domenica   
        
        // console.log('Domenica o festivo');
        // Oggi non si lavora, trovare un modo per farlo capire   
        $('#sosteCarousel').addClass('secondary'); // Non il massimo ma il più carino 
        $('#sosteCarousel').css('opacity', '.75');
    }
}

// Calcola dove sono di turno oggi
function controllaTurno() {
    /* INFO:
        - slice: Aggiunge uno "0" davanti al giorno e al mese, qualunque sia il loro valore prende le ultime due cifre 
                (es.1: "0" + (giorno =) 10 -> 010 [slice(-2)] -> 10, es.2: "0" + (giorno =) 3 -> 03 [slice(-2)] -> 03)
    */

    var dataPrimoGiorno = new Date(primoGiorno); // Imposta primoGiorno come data
    var dataOggi = new Date();
    var giorniLavorativi = 0;

    // dataOggi.setDate(dataOggi.getDate() - 2); // Imposta il giorno a domenica
    
    while ( (dataOggi.getDate() >= dataPrimoGiorno.getDate() && (dataOggi.getMonth() + 1) == (dataPrimoGiorno.getMonth() + 1)) ) {
      
        if ( dataOggi.getDay() != 0 && !(feste.includes( ("0" + dataOggi.getDate()).slice(-2) + "/" + ("0" + (dataOggi.getMonth() + 1)).slice(-2) ) )) { // Se non è domenica   
            giorniLavorativi += 1;
        }// Se è domenica/festivo non contare
        
        // Imposta la data `attuale` al giorno prima (prima controlla se oggi è festa/domenica e poi scali di 1)
        dataOggi.setDate(dataOggi.getDate() - 1);
    }
    giorniLavorativi -= 1; // Perché la prima sosta non la conti
    
    turno["nome"] = soste[(primaSosta["id"] - 1) + giorniLavorativi]["nome"];
    turno["id"] = soste[(primaSosta["id"] - 1) + giorniLavorativi]["id"];
}

// Mostra le soste a carosello sulla navbar
function stampaCalendario() {
    $('#turno').html('');
    for (let i = 1; i <= soste.length; i++) {
        if (i == turno["id"]) {
            $('#turno').append(`
                <div class="carousel-item active">
                    <span class="d-inline h2 mb-0" style="font-family: 'Rubik', sans-serif; font-weight: 500;">
                        ${ titleCase( soste[i - 1]["nome"] ) }
                    </span>
                </div>
            `);
        }
        else {
            $('#turno').append(`
                <div class="carousel-item">
                    <span class="d-inline h2 mb-0" style="font-family: 'Rubik', sans-serif; font-weight: 500;">
                        ${ titleCase( soste[i - 1]["nome"] ) }
                    </span>
                 </div>
            `);
        }
    }
}

// Nella funzione di ricerca apri la lista delle soste
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
// Nella funzione di ricerca apri la lista dei nominativi
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

// Fa apparire la lista delle soste completa
function listaSosteCompleta() {
    for (let i = 0; i < soste.length; i++) {
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
            </div>       
        `);
    }
}
// Fa apparire la lista dei nomi completa
function listaNominativiCompleta() {
    for (let i = 0; i < soste.length; i++) {
        $('#listaSoste').append(`
            <div class="card" onclick="dimmiDove(${nominativi[i]["id"]}, '${nominativi[i]["nome"]}');">
                <div class="card-body">
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

// Controlla se il carosello si muove
function controlloCarosello() {
    var carouselTurno = document.getElementById('carouselTurno');
    carouselTurno.addEventListener('slide.bs.carousel', function (val) {
        // Con il carousel si sposta anche il tunro lo cambia (se il carousel va a destra aggiungi 1 | se va a sinistra sottrai uno )
        if (val.direction == 'right') { // Se va a destra
            // e se è minore di 95 (nTurni), altrimenti ricomincia da 0
            if (turno["id"] < nTurni) {        
                turno["id"] = soste[(turno["id"] - 1) + 1]["id"];
                turno["nome"] = soste[turno["id"] - 1]["nome"];
            }
            else {
                turno["id"] = soste[0]["id"];
                turno["nome"] = soste[0]["nome"];
            }
        }
        else { // Se va a sinistra
            // e finché è minore di 1, altrimenti ricomincia da 95 (nTurni)
            if (turno["id"] > 1) {
                turno["id"] = soste[(turno["id"] - 1) - 1]["id"];
                turno["nome"] = soste[turno["id"] - 1]["nome"];
            } else {
                turno["id"] = soste[nTurni - 1]["id"];
                turno["nome"] = soste[nTurni - 1]["nome"];
            }
        }
        // console.log(turno, soste[turno["id"] - 1]["id"]);
    });
}

// Mostra il nome di chi sta a quella sosta
function dimmiChi(id, nome) { // Fanno riferimento alle informazioni della sosta dove voglio andare

    chiudiRisultatiRicerca();
    var idNominativo = 0;

    idNominativo = idTurno - (turno["id"] - id);
    if (idNominativo > nNominativi)
        idNominativo -= nNominativi;

    $("#inputSoste").prop("value", nome).prop("disabled", true);
    $("#risultato").html(`
        <div class="card">
            <div class="card-body" >
               ${nominativi[idNominativo - 1]["nome"]}
            </div>
        </div>
    `);
}
// Mostra la sosta dove sta quel nominativo
function dimmiDove(id, nome) {

    chiudiRisultatiRicerca();
    var idSoste = 0;

    idSoste = turno["id"] - ( idTurno - id );
    if ( idSoste < 1 )
        idSoste += nTurni;

    $("#inputSoste").prop("value", nome).prop("disabled", true);
    $("#risultato").html(`
        <div class="card">
            <div class="card-body" >
            ${soste[idSoste - 1]["nome"]}
            </div>
        </div>
    `);
}
// Se una riceca non da nessun risultato
function nessunRisultato(val) {
    $(val).append(`
        <div class="card">
            <div class="card-body text-center">
                <p class="display-2">(&#62;_&#60;)</p>
                <p class="h5">La ricerca non ha prodotto alcun risultato</p>
            </div>
        </div> 
    `);
}
// Mostra soste o nominativi
function mostraRisultati(val, info, i, turno) {

    if (turno) {     
        $(val).append(`
            <div class="card" onclick="impostaApplicaSosta(${soste[i]["id"]});">
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
    else if (info == 'soste') {
        $(val).append(`
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
    else if (info == 'nominativi') {
        $(val).append(`
            <div class="card" onclick="dimmiDove(${nominativi[i]["id"]}, '${nominativi[i]["nome"]}');">
                <div class="card-body">
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

// Imposta la sosta scelta
function impostaApplicaSosta(id) {
    turno["id"] = soste[id - 1]["id"];
    turno["nome"] = soste[id - 1]["nome"];
    stampaCalendario();
    $('#nuovaRicerca').hide();
    $('#risultato').hide();
    $("#inputSoste").prop("value", '').prop("disabled", false);
    $('#impostaSosteModal').modal('hide');
}
// Sistema di ricerca per cambiare la sosta
function applicaSosta() {
    var modal = new bootstrap.Modal(document.getElementById('impostaSosteModal'));
    modal.toggle();
    $('#inputImpostaSoste').focus();
    // Prendere gli input da tastiera per la ricerca live
    $('#inputImpostaSoste').bind('click keyup', function () {
        $("#impostaListaSosta").html('');
        var k = 0;
        var nada = true;
        for (let i = 0; i < soste.length && k < 2; i++) {
            // Risultati live
            if ( (soste[i]["nome"].toUpperCase().replace(/\s+/g, " ").trim().includes($(this).val().toUpperCase().replace(/\s+/g, " ").trim()) || ("0" + soste[i]["id"].trim()).slice(-2).includes(("0" + $(this).val().trim()).slice(-2)) ) && $(this).val() != '' )  {
                nada = false;
                k +=1; 
                mostraRisultati('#impostaListaSosta', 'soste', i, true);
            }
        }
        if (nada && $(this).val() != '') { // La ricerca non ha prodotto risultati :(
            nessunRisultato('#impostaListaSosta');
        }
    });
}
// Sistema di ricerca
function risultatiRicerca(val) {
    var nada = true;
    for (let i = 0; i < soste.length; i++) {
        // Risultati live
        if ( (soste[i]["nome"].toUpperCase().replace(/\s+/g, " ").trim().includes(val.toUpperCase().replace(/\s+/g, " ").trim()) || ("0" + soste[i]["id"].trim()).slice(-2).includes(("0" + val.trim()).slice(-2)) ) && val != '') {
            nada = false;
            mostraRisultati('#listaSoste', 'soste', i, false);
        }
    }
    // Risultati live
    for (let i = 0; i < nominativi.length; i++) {
        // str.replace(/\s+/g, " ").trim() -> remove space between words
        if ( (nominativi[i]["nome"].toUpperCase().replace(/\s+/g, " ").trim().includes(val.toUpperCase().replace(/\s+/g, " ").trim()) || (nominativi[i]["nome"].toUpperCase().replace(/\s+/g, " ").trim().includes(val.toUpperCase().replace(/\s+/g, " ").trim().split(' ').slice(-1))) || ("0" + nominativi[i]["id"].trim()).slice(-2).includes(("0" + val.trim()).slice(-2)) ) && val != '') {
            nada = false;
            mostraRisultati('#listaSoste', 'nominativi', i, false);
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
        nessunRisultato('#listaSoste');
    }
    if (val.trim().toLowerCase() == 'charly') { // Giochino per papà
        // da fare )
    }
}

// Svuota Ricerca
function svuotaRicerca() {
    $('#nuovaRicerca').hide();
    $('#pulisciRicerca').hide();
    $('#risultato').hide();
    $("#inputSoste").prop("value", '').prop("disabled", false);
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