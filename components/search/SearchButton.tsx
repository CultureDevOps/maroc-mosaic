import { AlgoliaButton } from "pliny/search/AlgoliaButton"
import { KBarButton } from "./KBarButton"
import siteMetadata from "@/data/siteMetadata"
import { SearchIcon } from "./icons"

const SearchButton = () => {
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === "algolia" || siteMetadata.search.provider === "kbar")
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === "algolia" ? AlgoliaButton : KBarButton

    return (
      <SearchButtonWrapper aria-label="Search">
        <SearchIcon className="size-6 text-white" />
      </SearchButtonWrapper>
    )
  }
}

export default SearchButton
