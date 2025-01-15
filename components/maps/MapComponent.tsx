"use client"
import { MapContainer, TileLayer, Polyline, Popup, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet-defaulticon-compatibility"
import { Locations } from "@/data/locationsData"
import { FC } from "react"

interface MapProps {
  data: Locations[];
}

const Map: FC<MapProps> = ({ data }) => {
  // Définir les hubs et les tracés (par exemple, les points de départ des voyages)
  const locations = data

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[31.791702, -7.09262]} // Centre par défaut sur le Maroc
        zoom={4}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {locations.map((location, index) => (
          <Marker
            key={index}
            position={L.latLng(location.coords[0], location.coords[1])}
            icon={L.icon({
              iconUrl: "/static/images/leaflet/marker-icon.png",
              iconSize: [25, 41], // Taille par défaut de l'icône
              iconAnchor: [12, 41], // Position de l'ancrage pour que le marqueur soit bien positionné
              popupAnchor: [1, -34], // Position du popup par rapport au marqueur
              shadowUrl: "/static/images/leaflet/marker-shadow.png",
              shadowSize: [41, 41],
              shadowAnchor: [12, 41],
            })}
          >
            <Popup>
              {location.name}
              <br />
              {location.info}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
