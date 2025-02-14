import { useEffect } from 'react';
import db from '../lib/db';
import { useRouter } from 'next/router'; // Importa useRouter de Next.js

export default function ListingDetails({ listing }) {
  const router = useRouter(); // Usa el router para redirigir

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

  if (!listing) {
    return <div>Alojamiento no encontrado</div>;
  }

  // Función para manejar la reserva
  const handleReserve = () => {
    // Redirigir a la página de reserva con los datos del alojamiento
    router.push({
      pathname: '/reserva',
      query: { 
        id_alojamiento: listing.id_alojamiento,
        precio: listing.precio,
        pais: listing.pais,
        ciudad: listing.ciudad,
        num_habitaciones: listing.num_habitaciones,
        num_huespedes: listing.num_huespedes,
        num_camas: listing.num_camas,
        num_banos: listing.num_banos
      }
    });
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

      <section className="listing-details">
        <h1 className="listing-id">ID: {listing.id_alojamiento}</h1>
        <h1>{listing.pais} - {listing.ciudad}</h1>
        <p>{listing.descripcion}</p>
        <h3>Cantidad de habitaciones: {listing.num_habitaciones}</h3>
        <h3>Cantidad de personas: {listing.num_huespedes}</h3>
        <h3>Cantidad de camas: {listing.num_camas}</h3>
        <h3>Cantidad de baños: {listing.num_banos}</h3>
        <p className="price">${listing.precio}</p>
        <button className="reserve-button" onClick={handleReserve}>Reserva</button>
      </section>

      <footer>
        <p>&copy; 2025. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id_alojamiento } = context.query;

  try {
    const query = `
      SELECT * FROM alojamientos
      WHERE id_alojamiento = $1;
    `;
    const result = await db.query(query, [id_alojamiento]);

    if (result.rows.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        listing: result.rows[0],
      },
    };
  } catch (error) {
    console.error('Error fetching listing details:', error);
    return {
      notFound: true,
    };
  }
}