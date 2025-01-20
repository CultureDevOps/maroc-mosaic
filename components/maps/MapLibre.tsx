"use client"
import { FC, useEffect, useRef, useState } from "react"
import { Locations } from "@/data/locationsData"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css" // Importer le CSS de Maplibre

interface MapProps {
  locale: LocaleTypes
  data: Locations[]
  focusedLocation: Locations | null
}

const MapLibre: FC<MapProps> = ({ data, focusedLocation, locale }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<maplibregl.Map | null>(null)

  // Dynamically load the maplibre-gl styles and components
  useEffect(() => {
    if (mapContainerRef.current) {
      const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
      if (!apiKey) {
        console.error("Missing MapTiler API key")
        return
      }

      // Construct the map style URL based on locale
      const styleUrl =
        locale === "fr"
          ? "https://api.maptiler.com/maps/ebf84f74-aa65-484d-9723-55575fdcd2ae/style.json?key=1S5VVCnTLgL4lp0NnyDP"
          : "https://api.maptiler.com/maps/a606109f-f9fe-4e69-a0e6-7673472e6ed7/style.json?key=1S5VVCnTLgL4lp0NnyDP"

      // Initialize the Maplibre map
      const mapInstance = new maplibregl.Map({
        container: mapContainerRef.current,
        style: styleUrl, // Apply the MapTiler style
        center: [-7.09262, 31.791702], // Center on Morocco by default
        zoom: 2,
        pitch: 0,
        bearing: 0,
      })

      setMap(mapInstance)

      return () => {
        if (mapInstance) {
          mapInstance.remove() // Cleanup on unmount
        }
      }
    }
  }, [locale])

  // Handle focusing on a location
  useEffect(() => {
    if (map && focusedLocation) {
      const { coords } = focusedLocation
      map.setCenter([coords[1], coords[0]]) // Update map view to focused location
      map.setZoom(10)

      // Smooth scroll the map into view
      const mapElement = document.querySelector(".maplibregl-map")
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [map, focusedLocation])

  // Add markers to the map
  useEffect(() => {
    if (map && data) {
      // Clear existing markers (if any)
      data.forEach((location) => {
        new maplibregl.Marker()
          .setLngLat([location.coords[1], location.coords[0]])
          .setPopup(
            new maplibregl.Popup({
              closeButton: false, // Optionally hide close button
              className: "text-black", // Apply Tailwind classes for black text
            }).setHTML(`
              <strong class="text-lg font-semibold">${location.name}</strong><br />
              <p class="text-sm">${location.info}</p>
            `)
          )
          .addTo(map)
      })
    }
  }, [map, data])

  return (
    <div className="size-full">
      {/* Map container */}
      <div ref={mapContainerRef} className="mx-auto h-[50vh] w-full md:h-[65vh]" />
    </div>
  )
}

export default MapLibre
