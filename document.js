//agregar los productos al html



const contenedorProductos = document.getElementById(`contenedor-productos`)

const contenedorCarrito = document.getElementById(`carrito-contenedor`)

const contadorCarrito = document.getElementById(`contador-carrito`)

const precioTotal = document.getElementById(`precio-total`)



//sumar los productos al formulario en el html



const productoFormularios = document.getElementById("producto-formulario")



//actualizar el numero de los productos



const contadorCarrito2 = document.getElementById(`contador-carrito2`)

const formularioPrecioTotal = document.getElementById(`formulario-precio-total`)



//filto de productos



const filtroTodos = document.getElementById("aside-filtro-todos")
const filtroApple = document.getElementById("aside-filtro-apple")
const filtroSamsung = document.getElementById("aside-filtro-samsung")
const filtroMotorola = document.getElementById("aside-filtro-motorola")
const filtroXiaomi = document.getElementById("aside-filtro-xiaomi")



const filtroMayor = document.getElementById("aside-filtro-mayor")
const filtroMenor = document.getElementById("aside-filtro-menor")
const filtroSinFiltro = document.getElementById("aside-filtro-sinfiltro")



//abrir y cerrar el carrito



const carritoModal = document.getElementById(`carrito-modal`)

const botonAbrirCarrito = document.getElementById("abrir-carrito")

const botonCerrarCarrito = document.getElementById(`cerrar-carrito`)



//mostrar el formulario y cerrar el carrito



const botonComprarCarrito = document.getElementById("boton-comprar-modal")

const ocultarSection = document.getElementById("ocultar-section")

const mostrarFormulario = document.getElementById("mostrar-formulario")



//validacion formulario


const form = document.getElementById("forms")
const formularionombre = document.getElementById("nombre")
const formularemail = document.getElementById("email")
const formularioNumero = document.getElementById("formularioNumero")
const formulariotarjeta = document.getElementById("numeroTarjeta")



//convertidor

const botonPesos = document.getElementById("boton-cambio-pesos")
const botonDolares = document.getElementById("boton-cambio-dolares")




//finalizar compra



const botonFinalizarCompra = document.getElementById("boton-finalizar-compra")