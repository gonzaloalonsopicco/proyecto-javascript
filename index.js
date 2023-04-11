let carritoCompras = [];



const promesa = new Promise ((resolve, reject) => {
    if(stockProductos){
        setTimeout(() => {
            resolve("cumplida");
        },1000);
    }else{
        reject("rechazada")
    }
})
promesa
.then(() => {
    mostrarProductos(stockProductos)
})
.catch(() => {
    swal.fire(
        'huo un error al cargar los productos',
        'recargue la pagina!',
        'error'
    )
})
.finally(() => {
    document.getElementById("spinner").style.display = "none"
    document.getElementById("contenedor-productos").style.display = "grid"
})




//agregar los productos al html



function mostrarProductos(array) {

    contenedorProductos.innerHTML = ""


    array.forEach(item => {

        let div = document.createElement(`div`)
        div.classList.add(`producto`)

        div.innerHTML += `
                <div class="articleDivProductos">
                    <h3 class="articleTituloProductos">${item.modelo}</h3>
                    <div class="articleDivFotosProductos">
                       <img  src="${item.img}" class="articleFotosProductos">
                    </div>
                    <div class="articleDivBotonPrecio">
                       <button id="agregar${item.id}" class="btn btn-primary articleBotonCarrito">Agregar</button>
                       <p class="articlePrecio">$${item.precio} </p>
                    </div>
                </div>
    `

        contenedorProductos.appendChild(div)

        let btnAgregar = document.getElementById(`agregar${item.id}`)
        btnAgregar.addEventListener(`click`, () => {
           
            Toastify({

                text: "se agrego al carrito",
                gravity: "bottom",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  },

                duration: 3000

            }).showToast();

            agregarAlCarrito(item.id);
        })

    });
}

mostrarProductos(stockProductos)



//agregar los productos al carrito



function agregarAlCarrito(id) {

    let actualizarNumero = carritoCompras.find(item => item.id == id)

    if (actualizarNumero) {
        actualizarNumero.cantidad = actualizarNumero.cantidad + 1
        document.getElementById(`und${actualizarNumero.id}`).innerHTML =
            `<p id="und${actualizarNumero.id}">Und:${actualizarNumero.cantidad}</p>`
        actualizarCarrito()
    } else {

        let productoAgregar = stockProductos.find(elemento => elemento.id == id)

        productoAgregar.cantidad = 1

        carritoCompras.push(productoAgregar)

        actualizarCarrito()


        mostrarCarrito(productoAgregar)
    }

    localStorage.setItem(`carrito`, JSON.stringify(carritoCompras))

}



//sumar los productos al carrito en el html



function mostrarCarrito(productoAgregar) {
    let div = document.createElement(`div`)
    div.className = `productoCarrito`
    div.innerHTML = `

            <div class="carritoModalProductos ">
                <img class="carritoModalImagen" src="${productoAgregar.img}">
                <div class="carritoModalTodo">
                    <p class="carritoModalProductoNombre">${productoAgregar.modelo}</p>
                    <div class="carritoModalProductoPrecio">
                        <p class="carritoModalLetra" id="und${productoAgregar.id}">Und:${productoAgregar.cantidad}</p>
                        <p class="carritoModalLetra cambioDeLetra">$${productoAgregar.precio} </p>
                    </div>
                </div>
                <button class="carritoModalSacarProductos" id="eliminar${productoAgregar.id}">-</button>
            </div>

`
    contenedorCarrito.appendChild(div)


    let div2 = document.createElement(`div`)
    div2.className = `productoFormulario`
    div2.innerHTML = `

            <div class="carritoModalProductos ">
                <img class="carritoModalImagen" src="${productoAgregar.img}">
                <div class="carritoModalTodo">
                    <p class="carritoModalProductoNombre">${productoAgregar.modelo} </p>
                    <div class="carritoModalProductoPrecio">
                        <p class="carritoModalLetra" id="und${productoAgregar.id}">Und:${productoAgregar.cantidad}</p>
                        <p class="carritoModalLetra cambioDeLetra">$${productoAgregar.precio} </p>
                    </div>
                </div>
            </div>

`
    productoFormularios.appendChild(div2)


    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    btnEliminar.addEventListener(`click`, () => {

        if (productoAgregar.cantidad == 1) {
            btnEliminar.parentElement.remove()
            carritoCompras = carritoCompras.filter(item => item.id != productoAgregar.id)
            actualizarCarrito()

            Toastify({
                text: "se elimino del carrito",
                gravity: "bottom",
                position: "right",
                style: {
                    background: "linear-gradient(to right, rgb(219, 77, 89), rgb(173, 79, 50)",
                  },
                duration: 3000
            }).showToast();

            localStorage.setItem(`carrito`, JSON.stringify(carritoCompras))

        } else {
            productoAgregar.cantidad = productoAgregar.cantidad - 1
            document.getElementById(`und${productoAgregar.id}`).innerHTML = `<p id="und${productoAgregar.id}">Und:${productoAgregar.cantidad}</p>`
            actualizarCarrito()

            Toastify({
                text: "se elimino del carrito",
                gravity: "bottom",
                position: "right",
                style: {
                    background: "linear-gradient(to right, rgb(219, 77, 89), rgb(173, 79, 50)",
                  },
                duration: 3000
            }).showToast();

            localStorage.setItem(`carrito`, JSON.stringify(carritoCompras))
        }


    })
}



//actualizar el numero de los productos



function actualizarCarrito() {

    contadorCarrito.innerText = carritoCompras.reduce((acc, el) => acc + el.cantidad, 0)

    contadorCarrito2.innerText = carritoCompras.reduce((acc, el) => acc + el.cantidad, 0)

    precioTotal.innerText = carritoCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)

    formularioPrecioTotal.innerText = carritoCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)

}



//filto de productos



function filtros(tipodefiltro) {
    tipodefiltro.addEventListener("click", () => {
        if (tipodefiltro.value == "todos") {
            mostrarProductos(stockProductos)
        } else {
            mostrarProductos(stockProductos.filter(elemento => elemento.marca == tipodefiltro.value))
        }

    })
}

filtros(filtroTodos)
filtros(filtroApple)
filtros(filtroSamsung)
filtros(filtroMotorola)
filtros(filtroXiaomi)



function filtros12(tipodefiltro) {
    tipodefiltro.addEventListener("click", () => {
        if (tipodefiltro.value == "sin") {
            location.reload()
        } if (tipodefiltro.value == "Mayor") {
            mostrarProductos(stockProductos.sort(function (a, b) { return b.precio - a.precio }))
        } else {
            mostrarProductos(stockProductos.sort(function (a, b) { return a.precio - b.precio }))
        }


    })
}

filtros12(filtroMayor)
filtros12(filtroMenor)
filtros12(filtroSinFiltro)



//abrir y cerrar el carrito



botonAbrirCarrito.addEventListener(`click`, () => {
    carritoModal.style.display = "block"
})

botonCerrarCarrito.addEventListener(`click`, () => {
    carritoModal.style.display = "none"
})



//mostrar el formulario y cerrar el carrito



function BotonMostrarFormulario() {
    botonComprarCarrito.addEventListener(`click`, () => {
        carritoModal.style.display = "none"
        ocultarSection.style.display = "none"
        mostrarFormulario.style.display = "block"
    })
}

BotonMostrarFormulario()



//validacion formulario



form.addEventListener("submit", e => {
    e.preventDefault()
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (nombre.value.length < 6) {
        swal.fire(
            'el nombre no es valido',
            'ingrese otro nombre!',
            'error'
        )
        entrar = true;
    }
    if (!regexEmail.test(formularemail.value)) {
        swal.fire(
            'el email no es valido',
            'ingrese otro email!',
            'error'
        )
        entrar = true;
    }
    if (formularioNumero.value.length < 12) {
        swal.fire(
            'el telefono no es valido',
            'ingrese otro telefono!',
            'error'
        )
        entrar = true;
    }
    if (formulariotarjeta.value.length < 15) {
        swal.fire(
            'el numero de la tarjeta no es valido',
            'ingrese otro numero!',
            'error'
        )
        entrar = true;
    }

})



//conversor de dolares



let numero = 0;

fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")

.then(res => res.json())
.then(data => {

    numero = parseInt(data[1].casa.venta)

    document.getElementById("boton-cambio-dolares").addEventListener("click", () => {
        formularioPrecioTotal.innerText = carritoCompras.reduce((acc, el) => el.precio / numero, 0)

    })
   
    document.getElementById("boton-cambio-pesos").addEventListener("click", () => {
        formularioPrecioTotal.innerText = carritoCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
        
    })
})


//finalizar compra



function finzalizarCompra () {

    botonFinalizarCompra.addEventListener(`click`, () => {
        
        Swal.fire({
            title: 'COMPRAR ARTICULOS',
            text: "estas seguro que quieres comprar estos articulos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, quiero comprar!',
            cancelButtonText: `no quiero`
        }).then((result) => {

            if (result.isConfirmed) {
                    document.getElementById("mostrar-formulario").style.display = "none"
                    document.getElementById("ocultar-section").style.display = "grid"
                    localStorage.removeItem("carrito");
                    actualizarCarrito()

                    Swal.fire(
                        'confirmado!',
                        'se ha completado la compra!',
                        'success'
                    ).then((result) => {
                        location.reload()
                    })
                }

            
        })
    })
}

finzalizarCompra()



//guardar los productos en el storage



function storage() {
    let recuperar = JSON.parse(localStorage.getItem(`carrito`))

    if (recuperar) {
        recuperar.forEach(e => {
            mostrarCarrito(e)
            carritoCompras.push(e)
            actualizarCarrito()
        })
    }
}

storage()


