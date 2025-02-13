import { useEffect, useState } from 'react';
import Filter from '../components/filter';

export default function Experiences() {
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

  const [filters, setFilters] = useState({});
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Simula una llamada a una API para obtener los alojamientos
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleFilter = (filters) => {
    setFilters(filters);
  };

  const filteredListings = listings.filter((listing) => {
    return (
      (!filters.location || listing.location.includes(filters.location)) &&
      (!filters.checkin || new Date(listing.checkin) >= new Date(filters.checkin)) &&
      (!filters.checkout || new Date(listing.checkout) <= new Date(filters.checkout)) &&
      (!filters.guests || listing.guests >= filters.guests)
    );
  });

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

      <Filter onFilter={handleFilter} />

      <section class="experiences">
        <h2>Experiencias</h2>
        <div class="experience-container">
          <div class="experience-item">Experiencia 1</div>
          <div class="experience-item">Experiencia 2</div>
          <div class="experience-item">Experiencia 3</div>
        </div>
      </section>

      <footer>
          <p>&copy; 2025. Todos los derechos reservados.</p>
      </footer>
    </div> 
  );
}