import React from 'react';

function IndustriesList({ industries }: any) {
  return (
    <div
      className="flex-1 bg-white-A700 rounded-xl p-3 sm:p-6 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
      style={{ background: 'white' }}
    >
      <h4 className="text-md font-bold text-primary-dark mb-4">{industries.name}</h4>
      <div className="mt-4 space-y-2">
        {industries.list.map((industry: any, index: any) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b last:border-b-0 border-background-overlay"
          >
            <span className="text-sm font-normal text-text-primary">{industry}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndustriesList;
