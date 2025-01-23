"use client"

import React, { useEffect, useState } from "react"
import { Analytics, AnalyticsConfig } from "pliny/analytics"
import siteMetadata from "@/data/siteMetadata"
import Cookies from "js-cookie"

export default function ConditionalAnalytics() {
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(
    Cookies.get("cookie_consent") === "true"
  )

  useEffect(() => {
    const handleConsentChange = () => {
      const consent = Cookies.get("cookie_consent") === "true"
      setAnalyticsConsent(consent)
    }

    // Ajoutez un écouteur pour surveiller les changements des cookies ou un événement personnalisé
    window.addEventListener("cookieConsentChange", handleConsentChange)

    return () => {
      window.removeEventListener("cookieConsentChange", handleConsentChange)
    }
  }, [])
  console.log(Cookies.get("cookie_consent"))
  console.log(`analyticsConsent : ${analyticsConsent}`)

  // Si l'utilisateur a donné son consentement, afficher l'Analytics
  if (!analyticsConsent) {
    return null // Ou un message pour informer l'utilisateur de la nécessité d'accepter
  }

  return <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
}
