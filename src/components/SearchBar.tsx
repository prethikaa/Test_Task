import React from "react";
import { TbSearch } from "react-icons/tb";

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchType: "name" | "code";
  setSearchType: React.Dispatch<React.SetStateAction<"name" | "code">>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  searchType,
  setSearchType,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    console.log(value);
    if (searchType === "code") {
      value = value.trim();
      if (/^[A-Za-z]{0,2}$/.test(value)) {
        setSearch(value.toUpperCase());
      }
    } else {
      setSearch(value);
    }
  };

  return (
    <div className="m-2 flex flex-col items-start gap-2">
      <div className="flex items-start gap-2 text-sm">
        <div className="text-gray-500">Search By</div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="name"
            checked={searchType === "name"}
            onChange={() => {
              setSearch("");
              setSearchType("name");
            }}
            className="accent-blue-500"
          />
          <span className="text-gray-700">Country Name</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="code"
            checked={searchType === "code"}
            onChange={() => {
              setSearch("");
              setSearchType("code");
            }}
            className="accent-blue-500"
          />
          <span className="text-gray-700">Country Code</span>
        </label>
      </div>

      <div className="relative w-full max-w-lg">
        <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder={
            searchType === "name"
              ? "Enter country name..."
              : "Enter country code..."
          }
          className="w-full pl-10 p-2 shadow-sm bg-white  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
