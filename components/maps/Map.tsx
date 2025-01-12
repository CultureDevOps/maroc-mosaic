"use client"

import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false, // Désactive le SSR pour ce composant
})

export default function Map() {
  return <MapComponent />
}
