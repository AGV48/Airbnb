 
export default function reserva() {
    return (
    <div>
        <header>
            <div className="logo"><a href="/">Airbnb</a></div>
            <div className="container">
                <a href="/prueba">Alojamientos</a>
                <a href="#">Experiencias</a>
                <a href="/registerHosting">Pon tu espacio en Airbnb</a>
            </div>
            <div className="usuario" id="usuario">
                <label className="popup">
                    <input type="checkbox" />
                    <div className="burger" tabIndex="0">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className="popup-window">
                        <legend>Actions</legend>
                        <ul className="popup-list">
                            <form action="">
                                <li><button><span>Iniciar Sesión</span></button></li>
                            </form>
                        </ul>
                    </nav>
                </label>
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