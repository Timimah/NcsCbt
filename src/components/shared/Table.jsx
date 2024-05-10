import React from 'react';

export const Table = ({ data, columns }) => {
  return (
      <div className="flex table-container w-full text-darkgrey overflow-x-scroll md:overflow-hidden shadow-md">
        <div className="table-header flex w-1/3 justify-between font-semibold text-lg border-primary border-r-2">
          <div className={`bg-secondary w-full grid grid-cols-${columns.length}`}>
            {columns.map((column) => (
              <div key={column.key} className="table-cell py-4 pl-7 border-b">
                {column.label}
              </div>
            ))}
          </div>
        </div>
        <div className="table-body flex w-full text-center">
          {data.map((item, index) => (
            <div key={item.id} className={`w-full grid grid-cols-${columns.length} ${index % 2 === 0 ? 'bg-secondary' : ''} items-center`}>
              {columns.map((column, index) => (
                <div key={`${item.id}-${column.key}`} className={`border-b table-cell px-5 py-5 ${index === columns.length - 2 ? 'text-primary overflow-visible overflow-x-auto' : ''} ${index === columns.length - 1 ? 'text-center' : ''}`}>
                  {item[column.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
  );
};