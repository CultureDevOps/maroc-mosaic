import { useState } from "react"
import { Locations } from "@/data/locationsData"
import { FC } from "react"
import { ChevronUpIcon, ChevronDownIcon, ViewfinderCircleIcon } from "@heroicons/react/24/solid"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"

interface TailwindTableProps {
  locale: LocaleTypes
  data: Locations[]

  onRowClick: (location: Locations) => void
}

const TailwindTable: FC<TailwindTableProps> = ({ data, onRowClick, locale }) => {
  const [sortBy, setSortBy] = useState<"name" | "country" | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchInfo, setSearchInfo] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const { t } = useTranslation(locale, "references")

  const filteredData = data.filter(
    (row) =>
      (searchTerm.length < 2 || row.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (searchInfo.length < 2 || row.info.toLowerCase().includes(searchInfo.toLowerCase()))
  )

  // Tri des données
  const sortedData =
    sortBy && sortOrder
      ? [...filteredData].sort((a, b) => {
          if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1
          if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1
          return 0
        })
      : filteredData // Si aucun tri n'est sélectionné, afficher les données filtrées sans tri

  const handleSearchChange = (field: "term" | "info", value: string) => {
    if (value.length > 1) {
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }

    if (field === "term") {
      setSearchTerm(value)
    } else {
      setSearchInfo(value)
    }

    // Réinitialiser l'opacité après un délai
    setTimeout(() => {
      setIsSearching(false)
    }, 300) // Durée de la transition
  }

  const handleSort = (column: "name" | "country") => {
    if (sortBy === column) {
      // Inverser la direction du tri
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc") // Réinitialiser à l'ordre croissant si un autre champ est trié
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="font-headings text-xl bg-primary-600 dark:bg-primary-500 text-white text-shadow text-shadow-black">
          <tr>
            <th className="cursor-pointer overflow-hidden rounded-tl-lg px-6 py-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <h2>{t("project")}</h2>
                  <button
                    className="ml-2 flex flex-col items-center"
                    onClick={() => handleSort("name")}
                  >
                    <ChevronUpIcon
                      className={`size-4 ${sortBy === "name" && sortOrder === "asc" ? "text-secondary-500" : "text-gray-200"}`}
                    />
                    <ChevronDownIcon
                      className={`size-4 ${sortBy === "name" && sortOrder === "desc" ? "text-secondary-500" : "text-gray-200"}`}
                    />
                  </button>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange("term", e.target.value)}
                  placeholder={t("search")}
                  className="rounded-lg border border-white/10 bg-primary-200/20 px-2 py-1 text-gray-700 text-xs
                    placeholder:text-gray-600 focus:border-secondary-500 focus:outline-none outline-none focus:ring-0"
                />
              </div>
            </th>

            <th className="hidden cursor-pointer px-6 py-3 lg:table-cell">{t("viewOnMap")}</th>
            <th className="hidden px-6 py-3 lg:table-cell">
              <div className="flex items-center gap-4">
                <h2>{t("description")}</h2>
                <input
                  type="text"
                  value={searchInfo}
                  onChange={(e) => handleSearchChange("info", e.target.value)}
                  placeholder={t("search")}
                  className="rounded-lg border border-white/10 bg-primary-200/20 px-2 py-1 text-gray-700 text-xs
                    placeholder:text-gray-600 focus:border-secondary-500 focus:outline-none outline-none focus:ring-0"
                />
              </div>
            </th>

            <th className="hidden cursor-pointer rounded-tr-lg px-6 py-3 text-xl lg:table-cell">
              <div className="flex items-center">
                {t("country")}
                <button
                  className="ml-2 flex flex-col items-center"
                  onClick={() => handleSort("country")}
                >
                  <ChevronUpIcon
                    className={`size-4 ${sortBy === "country" && sortOrder === "asc" ? "text-secondary-500" : "text-gray-200"}`}
                  />
                  <ChevronDownIcon
                    className={`size-4 ${sortBy === "country" && sortOrder === "desc" ? "text-secondary-500" : "text-gray-200"}`}
                  />
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          className={`transition-opacity duration-300 ${isSearching ? "opacity-0" : "opacity-100"}`}
          style={{ opacity: isSearching ? 0 : 1 }}
        >
          {sortedData.map((row, index) => (
            <tr key={index} className="border-t">
              {/* Sur mobile, afficher les données sous forme de cartes */}
              <td className="block border-b px-6 py-3 lg:hidden">
                <div className="text-lg font-bold">{row.name}</div>
                <div className="text-sm">{row.country}</div>
                <div className="text-sm">{row.info}</div>
                <button
                  onClick={() => onRowClick(row)}
                  className="mt-2 text-sm text-link underline"
                >
                  <FontAwesomeIcon icon={faLocationDot} className="size-6" /> {t("view_on_map")}
                </button>
              </td>

              {/* Sur les grands écrans, garder l'affichage du tableau classique */}
              <td className="hidden px-6 py-3 lg:table-cell">{row.name}</td>
              <td className="hidden px-6 py-3 lg:table-cell text-center">
                <button
                  onClick={() => onRowClick(row)}
                  className="text-link dark:text-link-dark underline flex justify-center items-center mx-auto"
                >
                  <FontAwesomeIcon icon={faLocationDot} className="size-6" />
                </button>
              </td>
              <td className={"hidden px-6 py-3 lg:table-cell"}>{row.info}</td>
              <td className="hidden px-6 py-3 lg:table-cell">{row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TailwindTable
