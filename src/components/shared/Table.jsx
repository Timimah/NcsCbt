import React from 'react';

export const Table = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-mono font-semibold"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-gray-50">
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-secondary hover:shadow-md"
            >
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.key}`}
                  className="px-6 py-4 text-sm text-gray-500 sm:px-3 sm:py-2"
                >
                  {item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};