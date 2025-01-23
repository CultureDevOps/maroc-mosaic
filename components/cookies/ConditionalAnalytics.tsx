"use client"

import React, { useEffect, useState } from "react"
import { Analytics, AnalyticsConfig } from "pliny/analytics"
import siteMetadata from "@/data/siteMetadata"
import Cookies from "js-cookie"

export default function ConditionalAnalytics() {
  const [analyticsConsent, setAnalyticsConsent] = useState(false)

  useEffect(() => {
    const consent = Cookies.get("analytics_consent") === "true"
    setAnalyticsConsent(consent)
  }, [])

  return (
    <div>
      {analyticsConsent && (
        <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
      )}
    </div>
  )
}
