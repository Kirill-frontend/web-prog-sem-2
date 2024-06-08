import React from 'react';


const Nothing: React.FC = ({ children }) => {
  return (
    <>
      <div className="nothing-wrapper">
        <div className="nothing-text">
          { children }
        </div>
      </div>
    </>
  )
}

export default Nothing