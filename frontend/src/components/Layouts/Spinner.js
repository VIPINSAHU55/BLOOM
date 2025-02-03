import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
    <svg
      viewBox="25 25 50 50"
      className="w-12 h-12 animate-spin origin-center"
    >
      <circle
        cx="50"
        cy="50"
        r="20"
        className="fill-none stroke-blue-600 stroke-[10] stroke-dasharray-[2,200] stroke-dashoffset-[0] stroke-linecap-round animate-dash"
      />
    </svg>
  </div>
  );
};



export default Spinner
