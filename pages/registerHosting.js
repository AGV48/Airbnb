import { useEffect, useRef } from 'react';

export default function RegisterHosting() {
  const formularioRegisterRef = useRef(null);

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
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formularioRegisterRef.current);
    const data = {
      nombreUsuario: formData.get("nombreUsuario"),
      nombreAlojamiento: formData.get("nombreAlojamiento"),
      descripcion: formData.get("descripcion"),
      pais: formData.get("pais"),
      ciudad: formData.get("ciudad"),
      direccion: formData.get("direccion"),
      numeroHabitaciones: formData.get("numeroHabitaciones"),
      numeroCamas: formData.get("numeroCamas"),
      numeroBaños: formData.get("numeroBaños"),
      numeroHuespedes: formData.get("numeroHuespedes"),
      precio: formData.get("precio"),
      politicasPago: formData.get("politicasPago"),
    };

    try {
      const response = await fetch('/api/register-hosting', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error al registrar el alojamiento:', error);
    }
  };

  return (
    <div>
      <header>
        <div className="logo">
          <a href="/">Airbnb</a>
        </div>
        <div className="container">
          <a href="/">Alojamientos</a>
          <a href="/experiences">Experiencias</a>
        </div>
        
        <div className="containerUsuario">
          <a href='/registerHosting' className="registerHosting">Pon tu espacio</a>
          <div className="usuario" id="usuario">
            <label className="popup">
              <input type="checkbox"></input>
              <div className="burger" tabIndex="0">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <nav className="popup-window">
                <legend>Acciones</legend>
                <ul className="popup-list">
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
        <form ref={formularioRegisterRef} className="form" onSubmit={handleSubmit}>
          <p className="title">Registrar alojamiento </p>

          <div className="flex">
            <label>
              <input name="nombreUsuario" required placeholder="" type="text" className="input"></input>
              <span>Nombre del usuario</span>
            </label>

            <label>
              <input name="nombreAlojamiento" required placeholder="" type="text" className="input"></input>
              <span>Nombre del alojamiento</span>
            </label>
          </div>  
          
          <label>
            <input name="descripcion" required placeholder="" type="text" className="input"></input>
            <span>Descripción</span>
          </label> 
          
          <label>
            <input name="pais" required placeholder="" type="text" className="input"></input>
            <span>País</span>
          </label>

          <label>
            <input name="ciudad" required placeholder="" type="text" className="input"></input>
            <span>Ciudad</span>
          </label>

          <label>
            <input name="direccion" required placeholder="" type="text" className="input"></input>
            <span>Dirección</span>
          </label>

          <label>
            <input name="numeroHabitaciones" required placeholder="" type="number" className="input"></input>
            <span>Numero de habitaciones</span>
          </label>

          <label>
            <input name="numeroCamas" required placeholder="" type="number" className="input"></input>
            <span>Numero de camas</span>
          </label>

          <label>
            <input name="numeroBaños" required placeholder="" type="number" className="input"></input>
            <span>Numero de baños</span>
          </label>

          <label>
            <input name="numeroHuespedes" required placeholder="" type="number" className="input"></input>
            <span>Numero de huespedes</span>
          </label>

          <label>
            <input name="precio" required placeholder="" type="number" className="input"></input>
            <span>Precio</span>
          </label>

          <label>
            <input name="politicasPago" required placeholder="" type="text" className="input"></input>
            <span>Politicas de Pago</span>
          </label>

          <button type="submit" className="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}