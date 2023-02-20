import React from 'react'
import './Loading.scss'
const Loading = () => {
  return (
    <div className='loading'>
      <div className="container">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default Loading