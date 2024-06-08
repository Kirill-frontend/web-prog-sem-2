import React from 'react';
import './styles/loader.css'

const GlobalLoader: React.FC = () => {
  return (
    <>
      <div className="fullscreen_block">
        <div className="lds-ripple"><div></div><div></div></div>
      </div>
    </>
  )
}

export default GlobalLoader