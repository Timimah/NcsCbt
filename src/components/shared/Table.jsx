import React from 'react';

export const Table = ({ data, columns }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col table-container w-full">
        <div className="table-header flex justify-between w-full">
          <div className="table-row bg-gray-200 w-full">
            {columns.map((column) => (
              <div key={column.key} className="table-cell px-4 py-2">
                {column.label}
              </div>
            ))}
          </div>
        </div>
        <div className="table-body flex flex-col">
          {data.map((item, index) => (
            <div key={item.id} className={`table-row ${index % 2 === 0 ? 'bg-secondary' : ''}`}>
              {columns.map((column) => (
                <div key={`${item.id}-${column.key}`} className="table-cell px-4 py-2">
                  {item[column.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};