const MOCK_VENUES = [
  {
    title: "Urban Soccer Field",
    location: { type: "Point", coordinates: [-3.7038, 40.4168] },
    pricePerHour: 50,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop"],
    sports: ["football"],
    description: "Excelente cancha de fútbol 5 en el centro.",
    address: "Downtown Sports Center",
    amenities: ["Lighting", "Locker rooms"],
    reviewsCount: 124
  },
  {
    title: "Sky High Basketball Court",
    location: { type: "Point", coordinates: [-3.71, 40.42] },
    pricePerHour: 35,
    rating: 4.5,
    images: ["https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop"],
    sports: ["basketball"],
    description: "Juega con las mejores vistas de la ciudad.",
    address: "Rooftop Park",
    amenities: ["Rooftop", "Professional hoops"],
    reviewsCount: 89
  },
  {
    title: "Elite Tennis Club",
    location: { type: "Point", coordinates: [-3.69, 40.415] },
    pricePerHour: 60,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop"],
    sports: ["tennis"],
    description: "Canchas de tierra batida profesionales.",
    address: "Green Valley",
    amenities: ["Clay court", "Shower"],
    reviewsCount: 56
  },
  {
    title: "Olympic Swimming Pool",
    location: { type: "Point", coordinates: [-3.7, 40.41] },
    pricePerHour: 25,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000&auto=format&fit=crop"],
    sports: ["swimming"],
    description: "Piscina olímpica climatizada.",
    address: "Aquatic Center",
    amenities: ["Heated", "Olympic size"],
    reviewsCount: 210
  },
  {
    title: "Padel Zone Plus",
    location: { type: "Point", coordinates: [-3.705, 40.425] },
    pricePerHour: 40,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1000&auto=format&fit=crop"],
    sports: ["padel"],
    description: "Las mejores canchas de pádel de cristal.",
    address: "West End",
    amenities: ["Glass walls", "Pro shop"],
    reviewsCount: 145
  },
  {
    title: "Crossfit Box 360",
    location: { type: "Point", coordinates: [-3.695, 40.43] },
    pricePerHour: 20,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"],
    sports: ["gym"],
    description: "Entrenamiento de alta intensidad con equipo top.",
    address: "Industrial District",
    amenities: ["Bumper plates", "Rig"],
    reviewsCount: 320
  }
];

module.exports = {
  async up(db, client) {
    const venuesToInsert = MOCK_VENUES.map(v => ({
      ...v,
      name: v.title,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await db.collection('venues').insertMany(venuesToInsert);

    // Create spatial index
    await db.collection('venues').createIndex({ location: "2dsphere" });
  },

  async down(db, client) {
    await db.collection('venues').deleteMany({
      name: { $in: MOCK_VENUES.map(v => v.title) }
    });
  }
};
