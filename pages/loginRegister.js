import { useEffect, useRef } from 'react';

export default function Register() {
    const contenedorRef = useRef(null);
    const formularioLoginRef = useRef(null);
    const formularioRegisterRef = useRef(null);
    const cajaTraseraLoginRef = useRef(null);
    const cajaTraseraRegisterRef = useRef(null);

    useEffect(() => {
        const btnIniciarSesion = document.getElementById("btn_iniciar-sesion");
        const btnRegistrarse = document.getElementById("btn_registrarse");
        const formularioRegister = document.querySelector(".formulario_register");
        const formularioLogin = document.querySelector(".formulario_login");

        const anchoPagina = () => {
            if (window.innerWidth > 850) {
                cajaTraseraLoginRef.current.style.display = "block";
                cajaTraseraRegisterRef.current.style.display = "block";
            } else {
                cajaTraseraRegisterRef.current.style.display = "block";
                cajaTraseraRegisterRef.current.style.opacity = "1";
                cajaTraseraLoginRef.current.style.display = "none";
                formularioLoginRef.current.style.display = "block";
                formularioRegisterRef.current.style.display = "none";
                contenedorRef.current.style.left = "0";
            }
        };

        const iniciarSesion = () => {
            if (window.innerWidth > 850) {
                formularioRegisterRef.current.style.display = "none";
                contenedorRef.current.style.left = "10px";
                formularioLoginRef.current.style.display = "block";
                cajaTraseraRegisterRef.current.style.opacity = "1";
                cajaTraseraLoginRef.current.style.opacity = "0";
            } else {
                formularioRegisterRef.current.style.display = "none";
                contenedorRef.current.style.left = "0px";
                formularioLoginRef.current.style.display = "block";
                cajaTraseraRegisterRef.current.style.display = "block";
                cajaTraseraLoginRef.current.style.display = "none";
            }
        };

        const register = () => {
            if (window.innerWidth > 850) {
                formularioRegisterRef.current.style.display = "block";
                contenedorRef.current.style.left = "410px";
                formularioLoginRef.current.style.display = "none";
                cajaTraseraRegisterRef.current.style.opacity = "0";
                cajaTraseraLoginRef.current.style.opacity = "1";
            } else {
                formularioRegisterRef.current.style.display = "block";
                contenedorRef.current.style.left = "0px";
                formularioLoginRef.current.style.display = "none";
                cajaTraseraRegisterRef.current.style.display = "none";
                cajaTraseraLoginRef.current.style.display = "block";
                cajaTraseraLoginRef.current.style.opacity = "1";
            }
        };

        const handleFormSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(formularioRegisterRef.current);
            const data = {
                nombre_completo: formData.get("nombre_completo"),
                contraseña: formData.get("contraseña"),
            };
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    alert('Usuario registrado con éxito');
                    window.location.reload(); // Recarga la página después de registrar con éxito
                } else {
                    alert('Error al registrar el usuario');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al registrar el usuario');
            }
        };

        const handleLoginSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(formularioLoginRef.current);
            const data = {
                nombre_completo: formData.get("nombre_completo"),
                contraseña: formData.get("contraseña"),
            };
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    const result = await response.json(); // Aquí obtienes la respuesta del backend
                    const user = result.usuario; // Accedes al objeto usuario retornado
                    localStorage.setItem("usuario", JSON.stringify(user)); // Guardas el usuario en localStorage
                    alert('Inicio de sesión exitoso');
                    location = "/"; // Recargar la página para reflejar los cambios
                } else {
                    alert('Error al iniciar sesión');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al iniciar sesión');
            }
        };
        
        formularioRegister.addEventListener("submit", handleFormSubmit);
        formularioLogin.addEventListener("submit", handleLoginSubmit);
        btnIniciarSesion.addEventListener("click", iniciarSesion);
        btnRegistrarse.addEventListener("click", register);
        window.addEventListener("resize", anchoPagina);

        anchoPagina(); // Ejecutar la función al inicio

        return () => {
            formularioRegister.removeEventListener("submit", handleFormSubmit);
            formularioLogin.removeEventListener("submit", handleLoginSubmit);
            btnIniciarSesion.removeEventListener("click", iniciarSesion);
            btnRegistrarse.removeEventListener("click", register);
            window.removeEventListener("resize", anchoPagina);
        };
        
    }, []);

    useEffect(() => {
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioGuardado) {
            const usuarioElemento = document.getElementById("usuario");
            if (usuarioElemento) {
                usuarioElemento.innerHTML = `
                    <label class="popup">
                        <input type="checkbox" />
                        <div class="burger" tabIndex="0">
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
                        window.location.reload();
                    });
                }
            }
        }
    }, []);

    return (
        <div>
        <header>
            <div className="logo">
            <a href="/">Airbnb</a>
            </div>
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

            <div className="contenedor_todo">
                <div className="caja_trasera">
                    <div ref={cajaTraseraLoginRef} className="caja_trasera-login">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar a la página</p>
                        <button id="btn_iniciar-sesion">Iniciar Sesión</button>
                    </div>
                    <div ref={cajaTraseraRegisterRef} className="caja_trasera-register">
                        <h3>¿Todavía no tienes una cuenta?</h3>
                        <p>Regístrate para entrar a la página</p>
                        <button id="btn_registrarse">Registrarse</button>
                    </div>
                </div>
                <div ref={contenedorRef} className="contenedor_login-register">
                    <form ref={formularioLoginRef} className="formulario_login">
                        <h2>Iniciar Sesión</h2>
                        <input type="text" placeholder="Nombre Completo" name="nombre_completo" autoComplete='off' required />
                        <input type="password" placeholder="Contraseña" name="contraseña" required />
                        <button>Entrar</button>
                    </form>
                    <form ref={formularioRegisterRef} className="formulario_register">
                        <h2>Registrarse</h2>
                        <input type="text" placeholder="Nombre Completo" name="nombre_completo" autoComplete='off' required />
                        <input type="password" placeholder="Contraseña" name="contraseña" required />
                        <input type="password" placeholder="Confirmación Contraseña" name="confirmacion_contraseña" required />
                        <button>Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
