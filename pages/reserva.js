import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Reserva() {
  const router = useRouter();
  const { id_alojamiento, precio, pais, ciudad, num_habitaciones, num_huespedes, num_camas, num_banos } = router.query;

  // Efecto para manejar la lógica de inicio de sesión y cierre de sesión
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    const usuarioElemento = document.getElementById("usuario");

    if (usuarioGuardado && usuarioElemento) {
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
      const cerrarSesionBtn = document.getElementById("cerrar_sesion");
      if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", () => {
          localStorage.removeItem("usuario");
          window.location.reload();
        });
      }
    }
  }, []);

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [caducidad, setCaducidad] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [precioTotal, setPrecioTotal] = useState(0); // Estado para el precio total

  // Función para calcular el precio total
  const calcularPrecioTotal = () => {
    if (fechaInicio && fechaFin) {
      const fechaInicioDate = new Date(fechaInicio);
      const fechaFinDate = new Date(fechaFin);
      const diferenciaTiempo = fechaFinDate - fechaInicioDate;
      const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Diferencia en días
      const tarifaPorNoche = parseFloat(precio); // Convertir el precio a número
      const total = tarifaPorNoche * diferenciaDias; // Calcular el precio total
      setPrecioTotal(total); // Actualizar el estado del precio total
    }
  };

  // Efecto para recalcular el precio total cuando cambian las fechas
  useEffect(() => {
    calcularPrecioTotal();
  }, [fechaInicio, fechaFin]);

  const handleReserve = async (e) => {
    e.preventDefault();

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioGuardado) {
      setError('Debes iniciar sesión para realizar una reserva');
      return;
    }

    const reservaData = {
      id_alojamiento: id_alojamiento,
      nombre_usuario: usuarioGuardado.nombre_completo,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    };

    try {
      const response = await fetch('/api/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      alert('Reserva realizada con éxito');
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };

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

      <div className="container2">
        <div className="card cart">
          <label className="title2">RESERVA</label>
          <div className="steps">
            <div className="step">
              <div>
                <span>ID DEL ALOJAMIENTO</span>
                <form className="form">
                  <input
                    className="input_field"
                    placeholder="Ingrese el id del alojamiento a reservar"
                    type="text"
                    value={id_alojamiento}
                    readOnly
                  />
                </form>
              </div>

              <hr />
              <div>
                <span>MÉTODO DE PAGO</span>
                <form className="form">
                  <select
                    className="input_field"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  >
                    <option value="">Seleccione método de pago</option>
                    <option value="credito">Tarjeta crédito</option>
                    <option value="debito">Tarjeta débito</option>
                  </select>
                  <input
                    className="input_field"
                    placeholder="Número de tarjeta"
                    type="text"
                    value={numeroTarjeta}
                    onChange={(e) => setNumeroTarjeta(e.target.value)}
                  />
                  <input
                    className="input_field"
                    placeholder="Caducidad"
                    type="text"
                    value={caducidad}
                    onChange={(e) => setCaducidad(e.target.value)}
                  />
                  <input
                    className="input_field"
                    placeholder="Código CVV"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </form>
              </div>

              <hr />
              <div>
                <span>LLEGADA</span>
                <form className="form">
                  <input
                    className="input_field"
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                  />
                </form>
              </div>

              <hr />
              <div>
                <span>SALIDA</span>
                <form className="form">
                  <input
                    className="input_field"
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                  />
                </form>
              </div>

              <hr />
              <div className="payments">
                <span>INFORMACIÓN DEL PRECIO</span>
                <div className="details">
                  <span>Tarifa por una noche:</span>
                  <span>${precio}</span>
                  <span>Tarifa completa:</span>
                  <span>${precioTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card checkout">
          <div className="footer">
            <label className="price">${precioTotal.toFixed(2)}</label> {/* Mostrar el precio total */}
            <button className="checkout-btn" onClick={handleReserve}>
              Reservar
            </button>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}