"use client"
import { MapContainer, TileLayer, Polyline, Popup, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet-defaulticon-compatibility"
import { Locations } from "@/data/locationsData"
import { FC, useEffect, useRef, useState } from "react"
import { LocaleTypes } from "app/[locale]/i18n/settings"

interface MapProps {
  locale: LocaleTypes
  data: Locations[]
  focusedLocation: Locations | null
}

const Map: FC<MapProps> = ({ data, focusedLocation, locale }) => {
  // Définir les hubs et les tracés (par exemple, les points de départ des voyages)
  const locations = data

  const mapRef = useRef<L.Map | null>(null)
  const [map, setMap] = useState<L.Map | null>(null)

  useEffect(() => {
    if (map && focusedLocation) {
      const { coords } = focusedLocation
      map.setView(L.latLng(coords[0], coords[1]), 10)
      // Remonter la scrollbar pour centrer la carte à l'écran
      const mapElement = document.querySelector(".leaflet-container")
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [map, focusedLocation])

  const getTileUrl = (locale: LocaleTypes) => {
    switch (locale) {
      case "fr":
        return "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
      case "en":
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[31.791702, -7.09262]} // Centre par défaut sur le Maroc
        zoom={3}
        // style={{ height: "65vh", width: "100%" }}
        className="mx-auto h-[50vh] w-full md:h-[65vh]"
        ref={setMap} // Passe la carte à l'état
      >
        <TileLayer url={getTileUrl(locale)} attribution="&copy; OpenStreetMap contributors" />

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
