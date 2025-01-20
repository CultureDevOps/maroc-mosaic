"use client"
import { FC, useEffect, useRef, useState } from "react"
import { Locations } from "@/data/locationsData"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import * as maptilerSdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import { MagnifyingGlassPlusIcon } from "@heroicons/react/20/solid"

interface MapProps {
  locale: LocaleTypes
  data: Locations[]
  focusedLocation: Locations | null
}

const MapTiler: FC<MapProps> = ({ data, focusedLocation, locale }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<maptilerSdk.Map | null>(null)
  const [popups, setPopups] = useState<maptilerSdk.Popup[]>([])

  const closeAllPopups = () => {
    popups.forEach((popup) => popup.remove())
    setPopups([]) // Réinitialiser la liste des popups
  }

  const createPopup = (location: Locations) => {
    const [lat, lng] = location.coords

    // Création de la popup avec un lien pour zoomer
    const markerPopup = new maptilerSdk.Popup({
      closeButton: true,
      focusAfterOpen: false,
      className: "text-black",
    })
      .setHTML(
        `
      <strong>${location.name}</strong><br />
      <p>${location.info}</p>
          
      <a href="#" class="zoom-link flex items-center space-x-2 text-link" data-lat="${lat}" data-lng="${lng}" title="Zoom">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
        </svg>
      </a>
    `
      )
      .setOffset([0, -30]) // Décale la popup vers le haut (ajustez cette valeur selon vos besoins)

    // Ajouter l'événement après que le lien de la popup est inséré
    markerPopup.on("open", () => {
      const zoomLink = markerPopup.getElement()?.querySelector(".zoom-link")
      if (zoomLink) {
        zoomLink.addEventListener("click", (e) => {
          e.preventDefault() // Empêche le comportement par défaut du lien
          const target = e.currentTarget as HTMLAnchorElement

          // Vérifiez que l'attribut existe avant d'y accéder
          const lat = parseFloat(target.getAttribute("data-lat") || "")
          const lng = parseFloat(target.getAttribute("data-lng") || "")
          const zoomLevel = 15 // Définissez le niveau de zoom souhaité

          console.log(`Zooming to [${lat}, ${lng}] at level ${zoomLevel}`)

          // Centrer la carte et appliquer le zoom
          map!.flyTo({
            center: [lng, lat],
            zoom: zoomLevel,
            essential: true, // Animation instantanée
          })
        })
      }
    })

    return markerPopup
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
    if (!apiKey) {
      console.error("Missing MapTiler API key")
      return
    }

    // Création de l'instance de la carte
    const defaultStyle = "OUTDOOR"
    const mapInstance = new maptilerSdk.Map({
      container: mapContainerRef.current!,
      style: maptilerSdk.MapStyle[defaultStyle],
      center: [-7.09262, 31.791702], // Coordonnées du Maroc
      zoom: 2,
      apiKey,
      geolocateControl: false,
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

    const styleSelect = document.createElement("select")
    styleSelect.classList.add(
      "absolute",
      "top-2",
      "right-12",
      "z-10",
      "text-black",
      "bg-white",
      "border",
      "border-gray-300",
      "rounded-md",
      "px-2",
      "py-1",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-secondary-500",
      "focus:border-secondary-500",
      "shadow-sm",
      "hover:cursor-pointer"
    )

    const styles = [
      { value: "STREETS", label: "Streets" },
      { value: "STREETS.DARK", label: "Streets Dark" },
      { value: "STREETS.LIGHT", label: "Streets Light" },
      { value: "SATELLITE", label: "Satellite" },
      { value: "OUTDOOR", label: "Outdoor" },
      { value: "HYBRID", label: "Hybrid" },
    ]

    styles.forEach((style) => {
      const option = document.createElement("option")
      option.value = style.value
      option.innerText = style.label
      if (style.value === defaultStyle) {
        option.selected = true
      }
      styleSelect.appendChild(option)
    })

    // Ajouter le sélecteur au DOM
    mapContainerRef.current.appendChild(styleSelect)

    // Ajouter un gestionnaire d'événement pour changer de style
    styleSelect.addEventListener("change", (e) => {
      const selectedStyle = (e.target as HTMLSelectElement).value.split(".")
      if (selectedStyle.length === 2) {
        // Pour les styles comme "STREETS.DARK", on utilise la notation imbriquée
        mapInstance.setStyle(maptilerSdk.MapStyle[selectedStyle[0]][selectedStyle[1]])
      } else {
        // Pour les autres styles comme "SATELLITE" ou "OUTDOOR", on les applique directement
        mapInstance.setStyle(maptilerSdk.MapStyle[selectedStyle[0]] || selectedStyle[0])
      }
    })

    return () => {
      // Nettoyage du DOM si nécessaire
      mapContainerRef.current?.removeChild(styleSelect)
    }
  }, [])

  useEffect(() => {
    if (!map || !focusedLocation) return

    const { coords } = focusedLocation
    // Remonter la scrollbar pour centrer la carte à l'écran
    const mapElement = document.querySelector(".maplibregl-map")
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    closeAllPopups()

    map.flyTo({
      center: [coords[1], coords[0]], // Assurez-vous que l'ordre des coordonnées est correct
      zoom: 10,
      essential: true,
    })

    // Créez et ajoutez la popup du focusedLocation
    const newPopup = createPopup(focusedLocation)
    newPopup.setLngLat([coords[1], coords[0]]).addTo(map)

    setPopups([newPopup])
  }, [map, focusedLocation])

  useEffect(() => {
    if (!map || !data || data.length === 0) return

    // Ajout des markers
    data.forEach((location) => {
      const [lat, lng] = location.coords
      if (!lng || !lat) {
        console.warn(`Invalid coordinates for location: ${location.name}`)
        return
      }

      // Création du marqueur avec l'icône personnalisée
      const marker = new maptilerSdk.Marker({ color: "#e77f5d" })
        .setLngLat([lng, lat]) // Assurez-vous que ce sont les bonnes coordonnées
        .addTo(map) // Ajouter le marqueur à la carte

      // Créez et attachez la popup au marqueur
      const markerPopup = createPopup(location)
      marker.setPopup(markerPopup)
      setPopups((prevPopups) => [...prevPopups, markerPopup])

      // Changer le curseur en "pointer" au survol du marqueur
      const markerElement = marker.getElement()
      markerElement.style.cursor = "pointer"
      markerElement.addEventListener("mouseenter", () => {
        markerElement.style.cursor = "pointer"
      })
      markerElement.addEventListener("mouseleave", () => {
        markerElement.style.cursor = ""
      })
    })
  }, [map, data])

  return <div ref={mapContainerRef} className="h-[50vh] w-full md:h-[65vh]" />
}

export default MapTiler
