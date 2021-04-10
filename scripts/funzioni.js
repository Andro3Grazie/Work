function controllaTurno() {
    var dataPrimoGiorno = new Date(primoGiorno); // Imposta primoGiorno come data
    var dataOggi = new Date();
    var giorniLavorativi = 0;

    while ( (dataOggi.getDate() >= dataPrimoGiorno.getDate() && (dataOggi.getMonth() + 1) == (dataPrimoGiorno.getMonth() + 1)) ) {


        // Imposta la data attuale al giorno prima
        // console.log(dataOggi);
        dataOggi.setDate(dataOggi.getDate() - 1);

        // console.log( feste.includes( ("0" + dataOggi.getDate()).slice(-2) + "/" + ("0" + (dataOggi.getMonth() + 1)).slice(-2) ) );
        // console.log(("0" + dataOggi.getDate()).slice(-2) + "/" + ("0" + (dataOggi.getMonth() + 1)).slice(-2));
        
        if ( dataOggi.getDay() != 0 && !(feste.includes( ("0" + dataOggi.getDate()).slice(-2) + "/" + ("0" + (dataOggi.getMonth() + 1)).slice(-2) ) )) { // Se non è domenica   
            giorniLavorativi += 1;
        }// Se è domenica non contare
        // console.log(giorniLavorativi);
    }
    giorniLavorativi -= 1; // Perché la prima sosta non la conti
    
    turno["nome"] = soste[(primaSosta["id"] - 1) + giorniLavorativi]["nome"];
    turno["id"] = soste[(primaSosta["id"] - 1) + giorniLavorativi]["id"];
}