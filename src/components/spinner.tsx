import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="animate-spin w-16 h-16 border-t-4 border-orange-500 border-solid border-l-4 border-r-4 rounded-full"></div>
    </div>
  );
};

export default Spinner;