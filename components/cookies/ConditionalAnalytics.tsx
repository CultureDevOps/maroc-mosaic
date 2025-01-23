"use client"

import React, { useEffect } from "react"
import { AnalyticsConfig } from "pliny/analytics"
import siteMetadata from "@/data/siteMetadata"
import Cookies from "js-cookie"
import ReactGA from "react-ga4"

export default function ConditionalAnalytics() {
  // Vérifie le consentement de l'utilisateur à l'utilisation des cookies d'analytics
  const analyticsConsent = Cookies.get("analytics_consent") === "true"

  useEffect(() => {
    if (analyticsConsent) {
      ReactGA.initialize(process.env.NEXT_GOOGLE_ANALYTICS_KEY!)

      ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search })
    }
  }, [analyticsConsent])

  if (!analyticsConsent) {
    return null
  }

  return null
}
