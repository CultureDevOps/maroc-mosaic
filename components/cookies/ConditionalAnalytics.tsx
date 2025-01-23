"use client"

import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import ReactGA from "react-ga4"

export default function ConditionalAnalytics() {
  const [analyticsConsent, setAnalyticsConsent] = useState(
    Cookies.get("analytics_consent") === "true"
  )

  useEffect(() => {
    const handleConsentChange = () => {
      setAnalyticsConsent(Cookies.get("analytics_consent") === "true")
    }

    // Ajoutez un écouteur pour surveiller les changements des cookies
    window.addEventListener("cookieConsentChange", handleConsentChange)

    return () => {
      window.removeEventListener("cookieConsentChange", handleConsentChange)
    }
  }, [])

  useEffect(() => {
    if (analyticsConsent) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY || "")
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname + window.location.search,
      })
    }
  }, [analyticsConsent])

  // Retourner null pour indiquer qu'aucun contenu n'est rendu
  return null
}
