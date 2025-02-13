import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Details() {
  const router = useRouter();
  const { id_alojamiento } = router.query;
  const [listing, setListing] = useState(null);

  useEffect(() => {
    if (id_alojamiento) {
      const fetchListing = async () => {
        try {
          const response = await fetch(`/api/listings?id_alojamiento=${id_alojamiento}`);
          const data = await response.json();
          setListing(data);
        } catch (error) {
          console.error('Error fetching listing:', error);
        }
      };

      fetchListing();
    }
  }, [id_alojamiento]);

  return (
    <div>
      <header>
        <div className="logo">
          <a href="/">Airbnb</a>
        </div>
      </header>
      <div className="listing-details">
        <div className="listing-id">ID: {listing.id_alojamiento}</div>
        <h2>{listing.pais} - {listing.ciudad}</h2>
        <p>{listing.descripcion}</p>
        <p className="price">{listing.precio}</p>
        <form action="/reserva">
          <button className="reserve-button">Reserva</button>
        </form>
      </div>
      <footer>
        <p>&copy; 2025. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
