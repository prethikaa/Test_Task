import React, { useState, useEffect, useMemo } from "react";
import "../styles/index.css";
import { CountryService } from "../services/CountryService";
import Filters from "../components/Filters";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import CountryTable from "../components/CountryTable";

import { MdErrorOutline } from "react-icons/md";
import { debounce, fuzzyMatch } from "../utils/searchUtils";

interface Country {
  name: string;
  code: string;
  currency: string;
  continent: {
    name: string;
    code: string;
  };
}

const App: React.FC = () => {
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

  useEffect(() => {
    if (!countries.length) return;

    let filtered = countries;
    const lowerSearch = debouncedSearch.toLowerCase();

    if (debouncedSearch) {
      if (searchType === "code") {
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

    filtered = filtered.filter((country) => {
      const matchesContinent = continent
        ? country.continent.code === continent
        : true;
      const matchesCurrency = currency ? country.currency === currency : true;
      return matchesContinent && matchesCurrency;
    });

    if (filtered.length === 0) {
      setError("No countries found!");
    } else {
      setError(null);
      setFilteredCountries(filtered);
    }
    if (page > Math.ceil(filtered.length / entriesPerPage)) {
      setPage(1);
    }
  }, [countries, continent, currency, debouncedSearch]);

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

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setPage(Number(params.get("page")) || 1);
      setEntriesPerPage(Number(params.get("entries")) || 10);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
          <div className="m-2 flex items-center justify-center bg-red-100 text-red-600 p-4 rounded-md shadow-md gap-2 ">
            <MdErrorOutline className="text-red-600 text-2xl" /> {error}
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
