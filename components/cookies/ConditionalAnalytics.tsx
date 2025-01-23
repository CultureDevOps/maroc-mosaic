"use client"

import React, { useEffect, useState } from "react"
import { Analytics, AnalyticsConfig } from "pliny/analytics"
import siteMetadata from "@/data/siteMetadata"
import Cookies from "js-cookie"

export default function ConditionalAnalytics() {
  const analyticsConsent = Cookies.get("analytics_consent") === "true"
  return <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
}
