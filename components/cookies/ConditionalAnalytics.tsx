"use client"

import React, { useEffect, useState } from "react"
import { Analytics, AnalyticsConfig } from "pliny/analytics"
import siteMetadata from "@/data/siteMetadata"
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider"
import Cookies from "js-cookie"

export default function ConditionalAnalytics() {
  const { consent } = useCookieConsent() // Accès au consentement via le contexte
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean | null>(consent) // État local

  useEffect(() => {
    const handleConsentChange = () => {
      const updatedConsent = Cookies.get("cookie_consent") === "true" // Vérifie le cookie directement
      setAnalyticsConsent(updatedConsent) // Met à jour l'état local
      console.log("Consent changed:", updatedConsent)
    }

    // Écoute l'événement pour mettre à jour dynamiquement
    window.addEventListener("cookieConsentChange", handleConsentChange)

    return () => {
      window.removeEventListener("cookieConsentChange", handleConsentChange)
    }
  }, [])

  useEffect(() => {
    // Met à jour l'état local à chaque changement du contexte
    setAnalyticsConsent(consent)
  }, [consent])

  // Affiche l'analytics uniquement si le consentement est "true"
  if (analyticsConsent !== true) {
    return null
  }

  return <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
}
