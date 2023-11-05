// Obtengo referencia a botones
// Recuerda: el punto . indica clases
const botones = document.querySelectorAll(".btn");

// Recupero el ID del botón que hizo click
// oculto la div de ese boton y muestro la próxima
// los botones se llaman b1, b2, ... bn y las divisiones div1, div2, ... divn
const HizoClick = function (evento) {

	// console.log("El texto que tiene es: ", this.innerText);
    // console.log("El id es: ", this.id);

    botonApretado = this.id;
    nroActual      = botonApretado.substr(1); // todo menos la primer posición
    // console.log("nroActual= ", nroActual);
    nroProximo    = Number(nroActual) + 1;
    // console.log("nroProximo= ", nroProximo);
    divOcultar = 'div' + nroActual;
    divMostrar = 'div' + nroProximo;
    // console.log("divOcultar= ", divOcultar," divMostrar= ", divMostrar);
    
    ocultar = document.getElementById(divOcultar);
    mostrar = document.getElementById(divMostrar);
    ocultar.style.display = 'none';
    mostrar.style.display = '';
;
}
// botones es un arreglo así que lo recorremos
botones.forEach(boton => {
	//Agregar listener
	boton.addEventListener("click", HizoClick);
});

function playAudio() {
    const audio = document.getElementById("audio");
    if (audio.canPlayType("audio/mp3")) {
      audio.play();
    } else {
      alert("Lo siento, tu navegador no soporta reproducción de audio.");
    }
  }