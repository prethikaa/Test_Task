import React, { useEffect, useMemo, useState } from "react";
import CountryTable from "../components/CountryTable";
import Filters from "../components/Filters";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { CountryService } from "../services/CountryService";
import "../styles/index.css";
import { MdErrorOutline } from "react-icons/md";
import { debounce, fuzzyMatch } from "../utils/searchUtils";

// Country interface
interface Country {
  name: string;
  code: string;
  currency: string;
  continent: {
    name: string;
    code: string;
  };
}

//App Component
const App: React.FC = () => {
  // State for managing countries data, filtered results, loading, errors, search, and pagination.
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [continent, setContinent] = useState("");
  const [currency, setCurrency] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchType, setSearchType] = useState<"name" | "code">("name");
  const params = new URLSearchParams(window.location.search);
  const [page, setPage] = useState(() => Number(params.get("page")) || 1);
  const [entriesPerPage, setEntriesPerPage] = useState(
    () => Number(params.get("entries")) || 10
  );

  // Updates the debounced search query
  const debouncedUpdateSearch = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedSearch(query);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedUpdateSearch(search);
  }, [search]);

  //Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await CountryService.getCountries(continent, currency);
        setCountries(data);
      } catch (error: unknown) {
        const e = error as Error;
        console.error(error);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [continent, currency]);

  // Filter countries based on search, continent, and currency
  useEffect(() => {
    if (!countries.length) return;
    let filtered: Country[] = countries;
    const lowerSearch: string = debouncedSearch.toLowerCase();
    if (debouncedSearch) {
      if (searchType === "code") {
        // Filter countries by code (exact or starts with)
        if (lowerSearch.length === 1) {
          filtered = countries.filter((country) =>
            country.code.toLowerCase().startsWith(lowerSearch)
          );
        } else if (lowerSearch.length === 2) {
          filtered = countries.filter(
            (country) => country.code.toLowerCase() === lowerSearch
          );
        }
      } else {
        // Filter countries by country name (Fuzzy search)
        filtered = countries
          .map((country) => ({
            ...country,
            matchScore: fuzzyMatch(lowerSearch, country.name),
          }))
          .filter((country) => country.matchScore > 0.3)
          .sort((a, b) => {
            if (a.name.toLowerCase() === lowerSearch) return -1;
            if (b.name.toLowerCase() === lowerSearch) return 1;
            if (a.name.toLowerCase().startsWith(lowerSearch)) return -1;
            if (b.name.toLowerCase().startsWith(lowerSearch)) return 1;
            return b.matchScore - a.matchScore;
          });
      }
    }
    //Filtering based on continent and currency
    filtered = filtered.filter((country) => {
      const matchesContinent = continent
        ? country.continent.code === continent
        : true;
      const matchesCurrency = currency ? country.currency === currency : true;
      return matchesContinent && matchesCurrency;
    });

    if (filtered.length === 0) {
      setError("No countries  matching your search or filters.");
    } else {
      setError(null);
      setFilteredCountries(filtered);
    }

    setPage(1);
  }, [countries, continent, currency, debouncedSearch]);

  // Update the URL with pagination details
  useEffect(() => {
    const updateUrl = () => {
      const params = new URLSearchParams(window.location.search);
      params.set("page", page.toString());
      params.set("entries", entriesPerPage.toString());
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    };

    updateUrl();
  }, [page, entriesPerPage]);

  // Sync state with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setPage(Number(params.get("page")) || 1);
      setEntriesPerPage(Number(params.get("entries")) || 10);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Pagination calculation for current page's data slice.
  const indexOfLastCountry = page * entriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - entriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  return (
    <div className="flex justify-center ">
      <div className="m-2 p-2 flex flex-col w-full max-w-4xl">
        <h1 className="m-2 text-2xl font-bold">Country Finder</h1>

        <SearchBar
          search={search}
          setSearch={setSearch}
          searchType={searchType}
          setSearchType={setSearchType}
        />
        <Filters
          continent={continent}
          setContinent={setContinent}
          currency={currency}
          setCurrency={setCurrency}
        />

        {error ? (
          <div className="m-2 flex items-center border  justify-center p-4 shadow-md gap-2 ">
            <MdErrorOutline className="text-2xl" /> {error}
          </div>
        ) : loading ? (
          <Loading />
        ) : (
          <>
            <div className="m-2">
              <strong>Total Countries: {filteredCountries.length}</strong>
            </div>
            <CountryTable countries={currentCountries} />
            <Pagination
              page={page}
              setPage={setPage}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
              totalItems={filteredCountries.length}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
