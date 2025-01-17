"use client"

import React, { useMemo, useState, useEffect, useRef } from "react"
import * as pdfjsLib from "pdfjs-dist/webpack.mjs"

type Props = {
  pdfUrl: string
}

function PdfViewer({ pdfUrl }: Props) {
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null)
  const [pdfPages, setPdfPages] = useState<Map<number, HTMLCanvasElement>>(new Map())
  const [totalPages, setTotalPages] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const visiblePagesRef = useRef({ startPage: 0, endPage: 0 })
  const [containerHeight, setContainerHeight] = useState<number | null>(null)
  const [scale, setScale] = useState(1)

  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true)
      setStartX(e.clientX) // Position de départ du clic
      setScrollLeft(containerRef.current?.scrollLeft || 0) // Position actuelle du défilement
      if (containerRef.current) {
        // Change le curseur en main fermée quand l'utilisateur clique
        containerRef.current.style.cursor = "grabbing"
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return // Si la souris n'est pas enfoncée, on ne fait rien
      const distance = e.clientX - startX // Distance parcourue
      if (containerRef.current) {
        containerRef.current.scrollLeft = scrollLeft - distance // Défilement horizontal en fonction du mouvement
      }
    }

    const handleMouseUp = () => {
      setIsMouseDown(false) // Fin du mouvement de souris
      if (containerRef.current) {
        // Restaure le curseur à la main ouverte quand l'utilisateur relâche
        containerRef.current.style.cursor = "grab"
      }
    }

    const handleMouseLeave = () => {
      if (isMouseDown) {
        setIsMouseDown(false) // Si la souris quitte l'élément tout en étant enfoncée, on arrête le mouvement
        if (containerRef.current) {
          // Restaure le curseur si la souris quitte l'élément
          containerRef.current.style.cursor = "grab"
        }
      }
    }

    // Ajouter les écouteurs d'événements pour la souris
    const currentContainer = containerRef.current
    if (currentContainer) {
      currentContainer.addEventListener("mousedown", handleMouseDown)
      currentContainer.addEventListener("mousemove", handleMouseMove)
      currentContainer.addEventListener("mouseup", handleMouseUp)
      currentContainer.addEventListener("mouseleave", handleMouseLeave)
    }

    // Nettoyer les écouteurs d'événements au démontage
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("mousedown", handleMouseDown)
        currentContainer.removeEventListener("mousemove", handleMouseMove)
        currentContainer.removeEventListener("mouseup", handleMouseUp)
        currentContainer.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isMouseDown, startX, scrollLeft])

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      const calculatedScale = containerWidth / 700
      // console.log(`calculatedScale : ${calculatedScale}`)
      setScale(Math.min(calculatedScale, 0.8))
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Appliquer la taille au chargement initial

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Lorsque les pages sont rendues, on récupère la hauteur de la première page
    if (pdfPages.size > 0) {
      const firstPageCanvas = pdfPages.get(1)
      if (firstPageCanvas) {
        const pageHeight = firstPageCanvas.height
        if (containerHeight !== pageHeight) {
          setContainerHeight(pageHeight + 30)
        }
      }
    }
  }, [pdfPages])

  useEffect(() => {
    const loadPdf = async () => {
      const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise
      setPdf(pdfDoc)
      setTotalPages(pdfDoc.numPages)
    }

    loadPdf()
  }, [pdfUrl])

  const renderPage = async (pageNum: number) => {
    if (!pdf) return
    // console.log(`Rendering page ${pageNum}`)
    const page = await pdf.getPage(pageNum)
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    canvas.width = viewport.width
    canvas.height = viewport.height
    await page.render({ canvasContext: context!, viewport }).promise
    return canvas
  }

  const handleScroll = async () => {
    const container = containerRef.current
    if (!container || totalPages === 0) return

    const scrollLeft = container.scrollLeft
    const containerWidth = container.clientWidth
    const firstPageCanvas = pdfPages.get(1)
    const pageWidth = firstPageCanvas ? firstPageCanvas.width : containerWidth / 3

    // Calculer les pages visibles avec un léger buffer
    const startPage = Math.max(1, Math.floor(scrollLeft / pageWidth))
    const endPage = Math.min(totalPages, startPage + 1)

    // Ne pas effectuer de mise à jour inutile
    if (
      visiblePagesRef.current.startPage === startPage &&
      visiblePagesRef.current.endPage === endPage
    ) {
      return
    }

    // console.log("Scroll Debug:", {
    //   scrollLeft,
    //   containerWidth,
    //   pageWidth,
    //   startPage,
    //   endPage,
    //   totalPages,
    // })

    visiblePagesRef.current = { startPage, endPage }

    const buffer = 3 // Réduire la marge de préchargement
    const pagesToRender = new Set<number>()

    // Ajouter les pages visibles et un petit buffer avant et après
    for (
      let i = Math.max(startPage - buffer, 1);
      i <= Math.min(endPage + buffer, totalPages);
      i++
    ) {
      pagesToRender.add(i)
    }

    // console.log("Pages to Render:", [...pagesToRender])

    // Créer une nouvelle copie de pdfPages pour ne pas muter l'état directement
    const newPdfPages = new Map(pdfPages)
    let pagesChanged = false

    // Précharger les pages nécessaires sans toucher à celles déjà rendues
    for (const pageNum of pagesToRender) {
      // Si la page est déjà présente dans newPdfPages, on la saute
      if (!newPdfPages.has(pageNum)) {
        const canvas = await renderPage(pageNum)
        if (canvas) {
          newPdfPages.set(pageNum, canvas)
          pagesChanged = true
        } else {
          console.error(`Failed to render page: ${pageNum}`)
        }
      }
    }

    // Mettre à jour l'état seulement si des pages ont changé
    if (pagesChanged) {
      // Mettre à jour l'état avec les nouvelles pages
      setPdfPages(newPdfPages)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onScroll = () => {
      handleScroll()
    }

    // Initialiser avec le scroll actuel pour charger les pages visibles
    handleScroll()
    container.addEventListener("scroll", onScroll)

    return () => {
      container.removeEventListener("scroll", onScroll)
    }
  }, [pdf, totalPages, pdfPages])

  return (
    <div
      ref={containerRef}
      className="container-scrollbar-horizontal"
      style={{
        overflowX: "scroll", // Défilement horizontal
        whiteSpace: "nowrap", // Empêche le retour à la ligne
        width: "100%", // Largeur du conteneur
        height: containerHeight ? `${containerHeight}px` : "auto", // Hauteur dynamique
        cursor: "grab",
      }}
    >
      {Array.from(pdfPages.values()).map((page, index) => (
        <div key={index} style={{ display: "inline-block", marginRight: "10px" }}>
          <canvas
            style={{
              display: "block",
              width: "auto",
              height: "100%", // La hauteur doit être ajustée en fonction de la page
            }}
            ref={(ref) => ref?.replaceWith(page)}
          />
        </div>
      ))}
    </div>
  )
}

export default PdfViewer
