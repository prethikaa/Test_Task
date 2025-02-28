import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="animate-pulse w-full">
      <div className="m-2">
        <div>
          <strong>Loading...</strong>
        </div>
      </div>
      <table className="m-2 w-full border border-gray-100 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            {["Country Name", "Country Code", "Continent", "Currency"].map(
              (index) => (
                <th key={index} className="p-3 border border-gray-100">
                  <div className="h-5 w-24 bg-gray-100 rounded"></div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className="border-t">
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <td key={colIndex} className="p-3 border border-gray-100">
                  <div className="h-5 w-32 bg-gray-100 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Loading;
