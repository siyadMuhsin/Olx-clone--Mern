import React from 'react'
import './Loading.css'
const Loading = ({isLoading}) => {
    if(!isLoading)return null;
  return (
    
<div className="loading-overlay">
  <div className="spinner"></div>
  <div className="loading-text">Please Wait...</div>
</div>
  )
}

export default Loading
