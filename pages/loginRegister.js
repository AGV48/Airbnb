import { useEffect } from 'react';

export default function Register() {
    useEffect(() => {
        // Este código solo se ejecuta en el cliente
        document.getElementById("btn_iniciar-sesion").addEventListener("click", iniciarSesion)
        document.getElementById("btn_registrarse").addEventListener("click", register);
        window.addEventListener("resize", anchoPagina);

        //Declaración de variables
        var contenedor_login_register = document.querySelector(".contenedor_login-register");
        var formulario_login = document.querySelector(".formulario_login");
        var formulario_register = document.querySelector(".formulario_register");
        var caja_trasera_login = document.querySelector(".caja_trasera-login");
        var caja_trasera_register = document.querySelector(".caja_trasera-register");

        function anchoPagina(){
            if(window.innerWidth > 850){
                caja_trasera_login.style.display = "block";
                caja_trasera_register.style.display = "block";
            }else{
                caja_trasera_register.style.display = "block";
                caja_trasera_register.style.opacity = "1";
                caja_trasera_login.style.display = "none";
                formulario_login.style.display = "block";
                formulario_register.style.display = "none";
                contenedor_login_register.style.left = "0";
            }
        }
        anchoPagina();

        function iniciarSesion(){
            if(window.innerWidth > 850){
                formulario_register.style.display = "none";
                contenedor_login_register.style.left = "10px";
                formulario_login.style.display = "block";
                caja_trasera_register.style.opacity= "1";
                caja_trasera_login.style.opacity = "0";
            }else{
                formulario_register.style.display = "none";
                contenedor_login_register.style.left = "0px";
                formulario_login.style.display = "block";
                caja_trasera_register.style.display= "block";
                caja_trasera_login.style.display = "none";
            }

        }

        function register(){
            if(window.innerWidth > 850){
                formulario_register.style.display = "block";
                contenedor_login_register.style.left = "410px";
                formulario_login.style.display = "none";
                caja_trasera_register.style.opacity= "0";
                caja_trasera_login.style.opacity = "1";
            }else{
                formulario_register.style.display = "block";
                contenedor_login_register.style.left = "0px";
                formulario_login.style.display = "none";
                caja_trasera_register.style.display= "none";
                caja_trasera_login.style.display = "block";
                caja_trasera_login.style.opacity = "1";
            }
        }
      }, []);

    return (
        <div>
            <header>
                <div class="logo"><a href="/">Airbnb</a></div>

                <div class="container">
                <a href="/prueba">Alojamientos</a>
                <a href="#">Experiencias</a>
                </div>
                
                <div class="usuario" id="usuario">

                <label class="popup">
                    <input type="checkbox"></input>
                    <div class="burger" tabindex="0">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                    <nav class="popup-window">
                    <legend>Actions</legend>
                    <ul class="popup-list">
                        <form action="">
                        <li><button><span>Iniciar Sesión</span></button></li>
                        </form>
                    </ul>
                    </nav>
                </label>
                </div>
            </header>

            <div class="contenedor_todo">
                <div class="caja_trasera">
                    <div class="caja_trasera-login">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar a la pagina</p>
                        <button id="btn_iniciar-sesion">Iniciar Sesión</button>
                    </div>
                    <div class="caja_trasera-register">
                        <h3>¿Todavía no tienes una cuenta?</h3>
                        <p>Regístrate para entrar a la pagina</p>
                        <button id="btn_registrarse">Registrarse</button>
                    </div>    
                </div>
                <div class="contenedor_login-register">
                    <form action="" method="POST" class="formulario_login">
                        <h2>Iniciar Sesión</h2>
                        <input type="text" placeholder="Nombre Completo" name="nombre_completo" require></input>
                        <input type="text" placeholder="Contraseña" name="contraseña" require></input>
                        <button>Entrar</button>
                    </form>

                    <form action="" method="POST" class="formulario_register">
                        <h2>Registrarse</h2>
                        <input type="text" placeholder="Nombre Completo" name="nombre_completo" require></input>
                        <input type="text" placeholder="Contraseña" name="contraseña" require></input>
                        <input type="text" placeholder="Confirmación Contraseña" name="confirmacion_contraseña" require></input>
                        <button>Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    )
}