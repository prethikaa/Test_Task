import React from "react";
import { BiWorld } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { ALL_CONTINENTS, ALL_CURRENCIES } from "../utils/constants";

interface FiltersProps {
  continent: string;
  setContinent: React.Dispatch<React.SetStateAction<string>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<FiltersProps> = ({
  continent,
  setContinent,
  currency,
  setCurrency,
}) => {
  return (
    <div className="m-2 flex flex-row flex-wrap justify-start gap-4">
      <div className="relative">
        <BiWorld className="absolute left-3 top-1/2 -translate-y-1/2  text-xl" />
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          className="w-44 pl-10 p-2 shadow-sm bg-white  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 cursor-pointer"
        >
          {ALL_CONTINENTS.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <BsCashCoin className="absolute left-3 top-1/2 -translate-y-1/2 text-xl" />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-44 pl-10 p-2 shadow-sm bg-white  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 cursor-pointer"
        >
          {ALL_CURRENCIES.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
