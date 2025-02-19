import { useEffect, useState } from 'react';
import Filter from '../components/filter';
import Link from 'next/link';

export default function Home() {
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

  const [filters, setFilters] = useState({});
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        console.log('casas:', data);
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
      (!filters.pais || listing.pais.toLowerCase().includes(filters.pais.toLowerCase())) &&
      (!filters.ciudad || listing.ciudad.toLowerCase().includes(filters.ciudad.toLowerCase())) &&
      (!filters.precio || listing.precio <= filters.precio)
    );
  });

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

      <Filter onFilter={handleFilter} />

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

      <footer>
          <p>&copy; 2025. Todos los derechos reservados.</p>
      </footer>
    </div> 
  );
}