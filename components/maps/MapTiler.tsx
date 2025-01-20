"use client"
import { FC, useEffect, useRef, useState } from "react"
import { Locations } from "@/data/locationsData"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import * as maptilerSdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"

interface MapProps {
  locale: LocaleTypes
  data: Locations[]
  focusedLocation: Locations | null
}

const MapTiler: FC<MapProps> = ({ data, focusedLocation, locale }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<maptilerSdk.Map | null>(null)
  // const language = locale === "fr" ? maptilerSdk.Language.FRENCH : maptilerSdk.Language.ENGLISH
  // if (language) {
  //   maptilerSdk.config.primaryLanguage = language
  // }

  useEffect(() => {
    if (!mapContainerRef.current) return

    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
    if (!apiKey) {
      console.error("Missing MapTiler API key")
      return
    }

    // Création de l'instance de la carte
    const mapInstance = new maptilerSdk.Map({
      container: mapContainerRef.current!,
      style: maptilerSdk.MapStyle.OUTDOOR,
      center: [-7.09262, 31.791702], // Coordonnées du Maroc
      zoom: 2,
      apiKey,
    })

    mapInstance.on("load", () => {
      console.log("Map loaded successfully")

      // Gestion du changement de langue après le chargement de la carte
      const language = locale === "fr" ? maptilerSdk.Language.FRENCH : maptilerSdk.Language.ENGLISH
      mapInstance.setLanguage(language)
    })

    mapInstance.on("error", (e) => {
      console.error("Map error:", e)
    })

    setMap(mapInstance)

    return () => {
      mapInstance.remove()
    }
  }, [locale])

  useEffect(() => {
    if (!map || !focusedLocation) return

    const { coords } = focusedLocation
    map.flyTo({
      center: [coords[1], coords[0]], // Assurez-vous que l'ordre des coordonnées est correct
      zoom: 10,
      essential: true,
    })

    // Remonter la scrollbar pour centrer la carte à l'écran
    const mapElement = document.querySelector(".maplibregl-map")
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    // Créez la popup avec un offset pour l'éloigner du marker
    new maptilerSdk.Popup({ closeButton: false, className: "text-black" })
      .setLngLat([coords[1], coords[0]]) // Position du marker
      .setHTML(
        `
        <strong>${focusedLocation.name}</strong><br />
        <p>${focusedLocation.info}</p>
      `
      )
      .setOffset([0, -30]) // Décale la popup vers le haut (ajustez cette valeur selon vos besoins)
      .addTo(map)
  }, [map, focusedLocation])

  useEffect(() => {
    if (!map || !data || data.length === 0) return

    // Ajout des markers
    data.forEach((location) => {
      // Vérification des coordonnées
      const [lat, lng] = location.coords
      if (!lng || !lat) {
        console.warn(`Invalid coordinates for location: ${location.name}`)
        return
      }

      // Création du marqueur avec l'icône personnalisée
      const marker = new maptilerSdk.Marker({ color: "#e77f5d" })
        .setLngLat([lng, lat]) // Assurez-vous que ce sont les bonnes coordonnées
        .setPopup(
          new maptilerSdk.Popup({ closeButton: false, className: "text-black" }).setHTML(`
            <strong>${location.name}</strong><br />
            <p>${location.info}</p>
          `)
        )
        .addTo(map)
    })
  }, [map, data])

  return <div ref={mapContainerRef} className="h-[50vh] w-full md:h-[65vh]" />
}

export default MapTiler
