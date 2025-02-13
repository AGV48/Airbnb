import { useEffect } from 'react';
 export default function reserva() {
    // Efecto para manejar la lógica de inicio de sesión y cierre de sesión
      useEffect(() => {
        // Verificar si hay un usuario en el localStorage
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
        const usuarioElemento = document.getElementById("usuario");
    
        if (usuarioGuardado && usuarioElemento) {
          // Actualizar el contenido del popup con el nombre del usuario
          usuarioElemento.innerHTML = `
            <label class="popup">
              <input type="checkbox"></input>
              <div class="burger" tabindex="0">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <nav class="popup-window">
                <legend>Hola, ${usuarioGuardado.nombre_completo}</legend>
                <ul class="popup-list">
                  <li><button id="cerrar_sesion"><span>Cerrar Sesión</span></button></li>
                </ul>
              </nav>
            </label>
          `;
          // Agregar evento para cerrar sesión
          const cerrarSesionBtn = document.getElementById("cerrar_sesion");
          if (cerrarSesionBtn) {
            cerrarSesionBtn.addEventListener("click", () => {
              localStorage.removeItem("usuario");
              window.location.reload(); // Recargar la página para reflejar el cierre de sesión
            });
          }
        }
      }, []);

    return (
    <div>
        <header>
        <div class="logo">Airbnb</div>
        <div class="container">
          <a href="/">Alojamientos</a>
          <a href="/experiences">Experiencias</a>
        </div>
        
        <div class="containerUsuario">
          <a href='/registerHosting' class="registerHosting">Pon tu espacio</a>
          <div class="usuario" id="usuario">
            <label class="popup">
              <input type="checkbox"></input>
              <div class="burger" tabindex="0">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <nav class="popup-window">
                <legend>Acciones</legend>
                <ul class="popup-list">
                  <form action="/loginRegister">
                    <li><button><span>Iniciar Sesión</span></button></li>
                  </form>
                </ul>
              </nav>
            </label>
          </div>
        </div>
      </header>
        
        <div class="container2">
            <div class="card cart">
                <label class="title2">RESERVA</label>
                <div class="steps">
                    <div class="step">
                        <div>
                            <span>ID DEL ALOJAMIENTO</span>
                            <form class="form">
                            <input class="input_field" placeholder="Ingrese el id del alojamiento a reservar" type="text"/>
                            </form>
                        </div>

                        <hr />
                        <div>
                            <span>METODO DE PAGO</span>
                            <form class="form">
                            <select class="input_field" id="opciones" name="opciones">
                                <option value="opcion1">Seleccione método de pago</option>
                                <option value="opcion1">Trageta crédito</option>
                                <option value="opcion2">Targeta débito</option>
                            </select>
                            <input class="input_field" placeholder="Numero de targeta" type="text"/>
                            <input class="input_field" placeholder="Caducidad" type="text"/>
                            <input class="input_field" placeholder="Código CVV" type="text"/>
                            </form>
                        </div>
                        
                        <hr />
                        <div>
                            <span>LLEGADA</span>
                            <form class="form">
                            <input class="input_field" type="date" id="fecha" name="fecha"></input>
                            </form>
                        </div>

                        <hr />
                        <div>
                            <span>SALIDA</span>
                            <form class="form">
                            <input class="input_field" type="date" id="fecha" name="fecha"></input>
                            </form>
                        </div>

                        <hr />
                        <div class="payments">
                            <span>INFORMACIÓN DEL PRECIO</span>
                            <div class="details">
                                <span>Tarifa por una noche:</span>
                                <span>$240.00</span>
                                <span>Tarifa completa:</span>
                                <span>$10.00</span>
                                <span>Impuestos:</span>
                                <span>$30.40</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card checkout">
                <div class="footer">
                    <label class="price">$280.40</label>
                    <button class="checkout-btn">Reservar</button>
                </div>
            </div>
        </div>
    </div>
    )
  }