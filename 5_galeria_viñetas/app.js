
const monedas = document.querySelectorAll(".coin");
const corazones = document.querySelectorAll(".corazon");
const contadorMonedas = document.querySelector("#contador-monedas");
const contadorCorazones = document.querySelector("#contador-corazones");
let totalMonedas = 0;
let totalCorazones = 0;

/* console.log(monedas, corazon, contadorMonedas, contadorCorazones); */

monedas.forEach(function (moneda) {

    moneda.addEventListener("click", function () {
        moneda.classList.add("saltar");
        totalMonedas++
        contadorMonedas.textContent = totalMonedas

    })

})

corazones.forEach(function (corazon) {

    corazon.addEventListener("click", function () {
        corazon.classList.add("saltar");
        totalCorazones++;
        contadorCorazones.textContent = totalCorazones;
    })
})

// Galería
const escenas = document.querySelectorAll(".escena"); 
const btnAnterior = document.querySelector(".anterior"); 
const btnSiguiente = document.querySelector(".siguiente"); 
const miniaturas = document.querySelectorAll(".miniaturas img"); 
let indice = 0
 
/* console.log(escenas) */ /* Todas las escenas */
/* console.log(escenas[1]) */ /* Segunda escena*/

function mostrarEscena(i) {
    /* console.log(escenas[i]) */
    for (let j = 0; j < escenas.length; j++) {
        escenas[j].classList.remove("activa");
    }

    escenas[i].classList.add("activa");

    indice = i;
}

/* boton siguiente */
btnSiguiente.addEventListener("click", function () {
   indice = indice + 1 
   if (indice >= escenas.length) {
       indice = 0 /* Para vuelva a la primera escena */
   }

   mostrarEscena(indice)
})

btnAnterior.addEventListener("click", function () {
   indice = indice - 1 
   if (indice < escenas.length -1) {
       indice = 0 /* Para vuelva a la primera escena */
   }

   mostrarEscena(indice)
})

miniaturas.forEach(function (miniatura, i) {
    miniatura.addEventListener("click", function () {
        mostrarEscena(i)
    })
})

const playStopImg1 = document.querySelector('#play-stop-img1');
const playStopImg2 = document.querySelector('#play-stop-img2');
const audio1 = document.querySelector('#audio-1');
const audio2 = document.querySelector('#audio-2');


console.log(playStopImg1);
console.log(playStopImg2);

//Funcion para reproducir video
function reproducirVideo() {
    video.play();
}


//Funcion para detener video
function pausarVideo  (){
    video.pause();
    
}


function toggleAudioUno() {
    if (audio1.paused) {
        audio1.play();
        playStopImg1.textContent = '⏸️ Stop';
    } else {
        audio1.pause();
        playStopImg1.textContent = '▶️ Play';
    }
    
}
playStopImg1.addEventListener('click', toggleAudioUno);



function toggleAudioDos() {
    if (audio2.paused) {
        audio2.play();
        playStopImg2.textContent = '⏸️ Stop';
    } else {
        audio2.pause();
        playStopImg2.textContent = '▶️ Play';
    }
    
}
playStopImg2.addEventListener('click', toggleAudioDos);

miniaturas.forEach( (miniatura, i)=> {
    miniatura.addEventListener("click", function () {
        mostrarEscena(i);
    })
})

const audios = [
document.getElementById("audio-escena1"), 
document.getElementById("audio-escena2"),
document.getElementById("audio-escena3"),
];

let audioActivo = null;
let sonidoReproduciendo = false;

function reproducirSonidoEscena (i) {
// Detener audio anterior si existe
if (audioActivo) {
audioActivo.pause();
audioActivo.currentTime  = 0;
}
if (sonidoReproduciendo) {
audioActivo = audios [i];
audioActivo.play();
}
}

// Modificar función mostrarEscena para activar sonido 
 const funcionoriginal = mostrarEscena;
mostrarEscena = function(i) {
funcionoriginal(i);
reproducirSonidoEscena (i);
};
// Botón Play/Stop
const btnPlayStop = document.getElementById("play-stop-img3");
btnPlayStop.addEventListener ("click", function () { 
    sonidoReproduciendo = !sonidoReproduciendo;
btnPlayStop.textContent = sonidoReproduciendo ? "Stop" : "play";

if (sonidoReproduciendo) {
reproducirSonidoEscena(indice);
}else if (audioActivo) {
audioActivo.pause();
}
});

