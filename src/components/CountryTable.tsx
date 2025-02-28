import React from "react";

// Country interface
interface Country {
  name: string;
  code: string;
  currency: string;
  continent?: {
    name: string;
    code: string;
  };
}

// CountryTableProps interface
interface CountryTableProps {
  countries: Country[];
}

//Table Component
const CountryTable: React.FC<CountryTableProps> = ({ countries }) => {
  return (
    <div className="w-full m-2 pr-4 sm:pr-8 lg:pr-16">
      <div className="overflow-x-auto">
        {/* Table to display country data */}
        <table className="w-full min-w-max border-collapse border border-gray-300">
          <thead>
            <tr className=" text-left ">
              <th className="p-2 border border-gray-300">Country Name</th>
              <th className="p-2 border border-gray-300">Country Code</th>
              <th className="p-2 border border-gray-300">Continent</th>
              <th className="p-2 border border-gray-300">Currency</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr
                key={country.code || country.name}
                className="hover:bg-gray-200"
              >
                <td className="p-2 border border-gray-300">
                  {country?.name || "Unknown"}
                </td>
                <td className="p-2 border border-gray-300">
                  {country?.code || "Unknown"}
                </td>
                <td className="p-2 border border-gray-300">
                  {country.continent?.name || "Unknown"}
                </td>
                <td className="p-2 border border-gray-300">
                  {country?.currency || "Unknown"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryTable;
