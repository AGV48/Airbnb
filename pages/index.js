import { useEffect, useState } from 'react';
import Filter from '../components/filter';
import Link from 'next/link';

export default function Home() {
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

  // Estados para manejar los filtros, listados y el estado de carga
  const [filters, setFilters] = useState({});
  const [listings, setListings] = useState([]);

  // Efecto para la obtención de datos de alojamientos desde una API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        console.log('casas:', data);
        setListings(data); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  // Función para manejar los filtros aplicados
  const handleFilter = (filters) => {
    setFilters(filters); // Actualizar el estado de los filtros
  };

  // Filtrar los listados basados en los filtros aplicados
  const filteredListings = listings.filter((listing) => {
    return (
      (!filters.pais || listing.pais.includes(filters.pais)) &&
      (!filters.ciudad || listing.ciudad.includes(filters.ciudad)) &&
      (!filters.guests || listing.guests >= filters.guests)
    );
  });

  // Renderizar la interfaz de usuario
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

      {/* Componente de filtro que permite al usuario aplicar filtros */}
      <Filter onFilter={handleFilter} />

      {/* Sección que muestra los alojamientos filtrados */}
      <section className="listings">
        <h2>Alojamientos populares</h2>
        <div id="listing-container" className="listing-container">
          {filteredListings.map((listing) => (
            <Link key={listing.id_alojamiento} href={`/listings_details?id_alojamiento=${listing.id_alojamiento}`} legacyBehavior>
              <a className="listing-card">
                <h3>{listing.pais} - {listing.ciudad}</h3>
                <p>{listing.descripcion}</p>
                <p className="price">${listing.precio}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* Pie de página */}
      <footer>
          <p>&copy; 2025. Todos los derechos reservados.</p>
      </footer>
    </div> 
  );
}