// Funzione principale 
function main() {
    controllaTurno();
    stampaCalendario();
    controlloCarosello();
    // se è un giorno festivo calcola lo stesso ma stampa come `active` del carousel che si sta sotto le coperte 
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
            // e se è minore di 95, altrimenti ricomincia da 0
            if (turno["id"] < 95) {        
                turno["id"] = soste[(turno["id"] - 1) + 1]["id"];
                turno["nome"] = soste[turno["id"] - 1]["nome"];
            }
            else {
                turno["id"] = soste[0]["id"];
                turno["nome"] = soste[0]["nome"];
            }
        }
        else { // Se va a sinistra
            // e finché è minore di 1, altrimenti ricomincia da 95
            if (turno["id"] > 1) {
                turno["id"] = soste[(turno["id"] - 1) - 1]["id"];
                turno["nome"] = soste[turno["id"] - 1]["nome"];
            } else {
                turno["id"] = soste[95 - 1]["id"];
                turno["nome"] = soste[95 - 1]["nome"];
            }
        }
        // console.log(turno, soste[turno["id"] - 1]["id"]);
    });
}