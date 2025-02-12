// pages/api/listings.js
export default function handler(req, res) {
  // Datos de prueba para los alojamientos
  const listings = [
    {
      id: 1,
      location: "Pereira, Colombia",
      description: "Amurai Glamping nace en el territorio ancestral Pachacué, a 25km de Pereira, Risaralda. Es un espacio para desconectarse de la ciudad y conectarse con la naturaleza. Amurai colecciona momentos y brinda a sus huéspedes una experiencia de paz.",
      price: "$400,000 COP noche",
      image: "/foto1.png",
      checkin: "2023-10-01",
      checkout: "2023-10-05",
      guests: 2
    },
    {
      id: 2,
      location: "Alojamiento 2",
      description: "Descripción breve del alojamiento 2.",
      price: "$250,000 COP noche",
      image: "/foto2.png",
      checkin: "2023-10-02",
      checkout: "2023-10-06",
      guests: 4
    },
    {
      id: 3,
      location: "Alojamiento 3",
      description: "Descripción breve del alojamiento 3.",
      price: "390,000 COP noche",
      image: "/foto3.png",
      checkin: "2023-10-03",
      checkout: "2023-10-07",
      guests: 6
    }
  ];

  // Retornar los alojamientos en formato JSON
  res.status(200).json(listings);
}