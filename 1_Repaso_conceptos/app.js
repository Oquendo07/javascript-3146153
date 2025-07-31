//1. Captura de variables
const pantalla = document.querySelector("#moticos")
const btn1 = document.querySelector("#boton1")
const btn2 = document.querySelector("#boton2")
const btn3 = document.querySelector("#boton3")

//2. Funciones
function blancoynegro(){
  console.log("imagen modificada")
  pantalla.style.filter = "grayscale(100%)"
/*   btn1.style.background = "green"
  btn1.style.color = "#2BC17A"
  btn1.style.heigth = "200px"
  btn1.style.borderRadius = "50%" */
}
function desenfocar(){
  console.log("imagen modificada")
  pantalla.style.filter = "blur(5px)"
}
function zoom(){
  console.log("imagen modificada")
  pantalla.style.transform = "scale(1.5) rotate(30deg)"
}
//3. Eventos
btn1.addEventListener("click", blancoynegro)
btn2.addEventListener("click", desenfocar)
btn3.addEventListener("click", zoom)