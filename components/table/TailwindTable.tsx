import { useState } from 'react'
import { Locations } from "@/data/locationsData"
import { FC } from "react"
import { ChevronUpIcon, ChevronDownIcon, ViewfinderCircleIcon } from '@heroicons/react/24/solid'
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"

interface TailwindTableProps {
  locale: LocaleTypes
  data: Locations[];
   
  onRowClick: (location: Locations) => void
}


const TailwindTable: FC<TailwindTableProps> = ({ data, onRowClick , locale}) => {
  const [sortBy, setSortBy] = useState<'name' | 'country'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInfo, setSearchInfo] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { t } = useTranslation(locale,"references")
  
  const filteredData = data.filter(
    (row) =>
      (searchTerm.length < 2 || row.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (searchInfo.length < 2 || row.info.toLowerCase().includes(searchInfo.toLowerCase()))
  );

  // Tri des données
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSearchChange = (field: 'term' | 'info', value: string) => {
    if (value.length > 1) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    if (field === 'term') {
      setSearchTerm(value);
    } else {
      setSearchInfo(value);
    }

    // Réinitialiser l'opacité après un délai
    setTimeout(() => {
      setIsSearching(false);
    }, 300); // Durée de la transition
  };

  const handleSort = (column: 'name' | 'country') => {
    if (sortBy === column) {
      // Inverser la direction du tri
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc'); // Réinitialiser à l'ordre croissant si un autre champ est trié
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-primary-500">
          <tr>
            <th className="py-3 px-6 cursor-pointer rounded-tl-lg overflow-hidden"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="font-headings text-xl">{t("project")}</span>
                  <div className="flex flex-col items-center ml-2">
                    <ChevronUpIcon
                      className={`size-4 ${sortBy === 'name' && sortOrder === 'asc' ? 'text-secondary-500' : 'text-gray-200'}`}
                    />
                    <ChevronDownIcon
                      className={`size-4 ${sortBy === 'name' && sortOrder === 'desc' ? 'text-secondary-500' : 'text-gray-200'}`}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange('term', e.target.value)}
                  placeholder="Rechercher"
                  className="px-2 py-1 ml-2 border border-white/10 rounded-lg bg-primary-200/20 
                            text-white outline-none focus:ring-3 focus:ring-secondary-300"
                />
              </div>
            </th>
            <th
              className="py-3 px-6 cursor-pointer hidden lg:table-cell font-headings text-xl"
            >
              {t("viewOnMap")}
            </th>
            <th className="py-3 px-6 hidden lg:table-cell font-headings text-xl">
              {t("description")}
              <input
                type="text"
                value={searchInfo}
                onChange={(e) => handleSearchChange('info', e.target.value)}
                placeholder="Rechercher"
                className="px-2 py-1 ml-4 border border-white/10 rounded-lg bg-primary-200/20 
                text-white outline-none focus:ring-3 focus:ring-secondary-300"
              />
            </th>
            <th
              className="py-3 px-6 cursor-pointer rounded-tr-lg hidden lg:table-cell text-xl"
              onClick={() => handleSort('country')}
            >
              <div className="flex items-center font-headings">
                {t("country")}
                <div className="flex flex-col items-center ml-2">
                  <ChevronUpIcon
                    className={`size-4 ${sortBy === 'country' && sortOrder === 'asc' ? 'text-secondary-500' : 'text-gray-200'}`}
                  />
                  <ChevronDownIcon
                    className={`size-4 ${sortBy === 'country' && sortOrder === 'desc' ? 'text-secondary-500' : 'text-gray-200'}`}
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={`transition-opacity duration-300 ${isSearching ? 'opacity-0' : 'opacity-100'}`}
          style={{ opacity: isSearching ? 0 : 1 }}>
          {sortedData.map((row, index) => (
            <tr key={index} className="border-t">

              {/* Sur mobile, afficher les données sous forme de cartes */}
              <td className="block lg:hidden py-3 px-6 border-b">
                <div className="font-bold text-lg">{row.name}</div>
                <div className="text-sm">{row.country}</div>
                <div className="text-sm">{row.info}</div>
                <button
                  onClick={() => onRowClick(row)}
                  className="text-link underline text-sm mt-2"
                >
                  <ViewfinderCircleIcon />
                </button>
              </td>

              {/* Sur les grands écrans, garder l'affichage du tableau classique */}
              <td className="py-3 px-6 hidden lg:table-cell">{row.name}</td>
              <td className="py-3 px-6 hidden lg:table-cell">
                <button
                  onClick={() => onRowClick(row)}
                  className="text-link underline"
                >
                  <ViewfinderCircleIcon />
                </button>
              </td>
              <td className={`py-3 px-6 hidden lg:table-cell`}>
                {row.info}
              </td>
              <td className="py-3 px-6 hidden lg:table-cell">{row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TailwindTable