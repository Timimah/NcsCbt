import React from 'react';

export const Table = ({ data, columns }) => {
  return (
      <div className="flex flex-col table-container w-full text-darkgrey">
        <div className="table-header flex justify-between w-full font-semibold text-lg">
          <div className={`bg-secondary w-full grid grid-cols-${columns.length}`}>
            {columns.map((column) => (
              <div key={column.key} className="table-cell p-4">
                {column.label}
              </div>
            ))}
          </div>
        </div>
        <div className="table-body flex flex-col">
          {data.map((item, index) => (
            <div key={item.id} className={`grid grid-cols-${columns.length} ${index % 2 === 0 ? 'bg-secondary' : ''} items-center`}>
              {columns.map((column, index) => (
                <div key={`${item.id}-${column.key}`} className={`table-cell px-5 py-3 ${index === columns.length - 2 ? 'text-primary overflow-visible overflow-x-auto' : ''} ${index === columns.length - 1 ? 'text-center' : ''}`}>
                  {item[column.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
  );
};