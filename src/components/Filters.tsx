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
      <div className="flex flex-row sm:flex-row items-center gap-2 p-2 shadow-sm bg-white border border-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 cursor-pointer">
        <BiWorld className="text-xl" />
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          className=""
        >
          {ALL_CONTINENTS.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
  
      <div className="flex flex-row sm:flex-row items-center gap-2 p-2 shadow-sm bg-white border border-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 cursor-pointer">
      <BsCashCoin className="text-xl"/>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className=""
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
