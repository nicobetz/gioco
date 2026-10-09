
var giocatore_attivo;
var frase_attiva;
var valore_ruota = 0;
var giocatori = ["Michele", "Francesco", "Luca"];
var punteggi = [0, 0, 0];
var frasi = ["IL BUONGIORNO SI VEDE DAL MATTINO", "IL LUPO PERDE IL PELO MA NON IL VIZIO  ", "MEGLIO SOLI CHE MALE ACCOMPAGNATI", "IL DIAVOLO FA LE PENTOLE MA NON I COPERCHI", "FRA I DUE LITIGANTI IL TERZO GODE", "CHI VA CON LO ZOPPO IMPARA A ZOPPICARE"];
/* Quanti gradi ha ogni spicchio della ruota?
 * 360 gradi diviso il numero di caselle della ruota, ad esempio 12 spicchi avranno 30 gradi
 */
var gradi_per_spicchio = 32.7;
var numero_spicchi = 11;
var valori_ruota = [50, 100, 80, 0, 200, 100, 20, 50, -100, 200, 0];// dovete dare valore diverso a Passa, Jolly

var bottone_inizia = document.getElementById("inizia_gioco");
var bottone_gira = document.getElementById("gira");
var bottone_soluzione = document.getElementById("soluzione");
var bottone_scegli_lettera = document.getElementById("cerca_lettera");
var input_lettera = document.getElementById("lettera");
var input_soluzione = document.getElementById("input_soluzione");


function getRandomInt(min, max) {
  /* //Il max è escluso e il min è incluso
   */
  return Math.floor(Math.random() * (max - min)) + min;
}

function inizia_gioco() {
  /* 1 seleziono la frase
     2 creo il tabellone
     3 seleziono il primo giocatore
     4 abilito il bottone per girare
  */
  seleziona_frase();
  crea_tabellone();
  giocatore_attivo = 0;
  document.getElementById("giocatore_attivo").innerText = giocatori[giocatore_attivo];
  bottone_gira.disabled = false;
  bottone_inizia.disabled = true;
  
}

function seleziona_frase() {  
  var indice_frase_attiva = getRandomInt(0, frasi.length);
  frase_attiva = frasi[indice_frase_attiva];
}

function crea_tabellone() {
  var tabellone = document.getElementById("tabellone");
  var html = "";
  for (var i = 0; i < frase_attiva.length; i++) {
    html = html + '<span class="cella" id="id' + i + '"></span>';
  }
  tabellone.innerHTML = html;
  var celle = document.getElementsByClassName("cella");
  for (var i = 0; i < celle.length; i++) {
    if (frase_attiva[i] != " ") {
      celle[i].className = celle[i].className + " lettera";
    }
  }
}

function gira() {
  //reset_ruota();
  var posizione_ruota = getRandomInt(0, numero_spicchi);
  console.log(posizione_ruota);
  valore_ruota = valori_ruota[posizione_ruota];
  
  var gradi =
    posizione_ruota * gradi_per_spicchio + 3600 + gradi_per_spicchio / 2;
  var circle = document.getElementById("circle");
  circle.classList.add("start");
  circle.style.transitionProperty = "transform";
  circle.style.transitionDuration = "5s";
  circle.style.transform = "rotate(-" + gradi + "deg)";
  bottone_gira.disabled = true;
    /* qui dovete controllare il valore. Es. 
     * if(valore_ruota== 0) 
     * 	{prossimo giocatore();} 
     * else
     * 	 if(valore_ruota== 1)
     * 		{punteggio=0;} 
     * else
     * 		 if(valore_ruota== 2)
     * 			{scegli un'altra} 
     * 		 else
     * 		{cosa fare se escono punti}
     * Le tre righe successive al commento vanno bene quando escono punti*/
  //bottone_scegli_lettera.disabled = false;
  //input_lettera.disabled = false;
  document.getElementById("audio").play();

}

function reset_ruota() {
  circle.style.transitionProperty = "none";
  circle.style.transitionDuration = "0s";
  circle.offsetHeight;
  circle.style.transform = "rotate(0deg)";
}

function prossimo_giocatore() {
  giocatore_attivo = (giocatore_attivo + 1) % 3;
  document.getElementById("giocatore_attivo").innerText =
    giocatori[giocatore_attivo];
  reset_ruota();
  bottone_gira.disabled = false;
  bottone_scegli_lettera.disabled = true;
  input_lettera.disabled = true;
}

function prossima_lettera() {
  bottone_gira.disabled = false;
  bottone_scegli_lettera.disabled = true;
  bottone_soluzione.disabled = false;
  input_lettera.disabled = true;
  input_soluzione.disabled = false;
  reset_ruota();
}

function cambia_frase() {
  seleziona_frase();
  crea_tabellone();
}

function cerca_lettera(lettera) {
  //var lettera = document.getElementById("lettera").value.toUpperCase();
  var moltiplicatore = 0;
  var trovata_lettera = false;
  var celle = document.getElementsByClassName("cella ");
  for (var i = 0; i < frase_attiva.length; i++) {
    if (frase_attiva[i] == lettera && celle[i].innerText == "") {
      moltiplicatore = moltiplicatore + 1;
      celle[i].innerText = lettera;
    }
   
  }
	alert(valore_ruota+" "+moltiplicatore);
  aggiorna_punteggio(valore_ruota * moltiplicatore);
  if (moltiplicatore == 0) {
    prossimo_giocatore();
  } else {
    prossima_lettera();
  }
  document.getElementById("lettera").value = "";
}

function aggiorna_punteggio(x) {
  var punteggio = document.getElementById("punteggio" + giocatore_attivo);
  punteggio.value = Number(punteggio.value) + x; // ho trasformato il punteggio in numero
}

function soluzione() {
  var soluzione = document.getElementById("input_soluzione").value;
  if (frase_attiva.trim().toUpperCase() == soluzione.toUpperCase()) {
    var punteggio = document.getElementById("punteggio" + giocatore_attivo)
      .value;
    alert(
      "Il giocatore " +
        giocatori[giocatore_attivo] +
        " ha indovinato la frase. Ha vinto: " +
        punteggio +
        "€."
    );
    bottone_gira.disabled = true;
    bottone_inizia.disabled = false;
  } else {
    alert(
      "Il giocatore " +
        giocatori[giocatore_attivo] +
        " NON indovinato la frase, Prossimo giocatore!!"
    );
    prossimo_giocatore();
  }
}



/* Associo le funzioni ai bottoni
 */
document.getElementById("valore_ruota").onclick = valore_ruota;
document.getElementById("inizia_gioco").onclick = inizia_gioco;
document.getElementById("gira").onclick = gira;
document.getElementById("prossimo_giocatore").onclick = prossimo_giocatore;
document.getElementById("cambia_frase").onclick = cambia_frase;
document.getElementById("cerca_lettera").onclick = cerca_lettera;
document.getElementById("soluzione").onclick = soluzione;
