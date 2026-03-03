import React from "react";

export interface MapProps {
  providerLocation: string; // e.g. "Dakar, Sénégal" or address
  clientLocation?: string; // optional, for route display
}

export const MapView: React.FC<MapProps> = ({ providerLocation, clientLocation }) => {
  // For demo: use Google Maps Embed API (can be replaced by leaflet or react-google-maps)
  // If both locations are provided, show directions; else, show provider location only
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with env variable in prod
  let mapSrc = "";

  if (providerLocation && clientLocation) {
    mapSrc = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${clientLocation}&destination=${providerLocation}`;
  } else if (providerLocation) {
    mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${providerLocation}`;
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border">
      {mapSrc ? (
        <iframe
          title="Carte du prestataire"
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Carte non disponible
        </div>
      )}
    </div>
  );
};
