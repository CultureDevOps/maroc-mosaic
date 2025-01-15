import { useState } from 'react'
import { Locations } from "@/data/locationsData"
import { FC } from "react"

interface TailwindTableProps {
  data: Locations[];
  onRowClick: (location: Locations) => void
}


const TailwindTable: FC<TailwindTableProps> = ({ data, onRowClick }) => {
  const [sortBy, setSortBy] = useState<'name' | 'country'>('name')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Nombre de lignes par page

  // Tri des données
  const sortedData = [...data].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1
    if (a[sortBy] > b[sortBy]) return 1
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-primary-500">
          <tr>
            <th
              className="py-3 px-6 cursor-pointer rounded-tl-lg"
              onClick={() => setSortBy('name')}
            >
              Nom
            </th>
            <th
              className="py-3 px-6 cursor-pointer"
            >
              Coordonnées
            </th>
            <th className="py-3 px-6">Info</th>
            <th
              className="py-3 px-6 cursor-pointer rounded-tr-lg"
              onClick={() => setSortBy('country')}
            >
              Pays
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} className="border-t">
              <td className="py-3 px-6">{row.name}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => onRowClick(row)}
                  className="text-link underline"
                >
                  Voir sur la carte
                </button>
              </td>
              <td className="py-3 px-6">{row.info}</td>
              <td className="py-3 px-6">{row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`mx-8 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
          Précédent
        </button>
        <span className="text-gray-600">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`mx-8 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
          Suivant
        </button>
      </div>
    </div>
  )
}

export default TailwindTable