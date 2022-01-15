import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import './style.css'


const Banner = ({head, subhead}) => {
  const history = useHistory()
  return (
    <div className="banner">
      <div className="banner-section" onClick={()=>{history.push('/')}}>
        <div className="banner-logo"></div>
        <div className="banner-header">
          <h3>{subhead}</h3>
          <div className="banner-title">
          <h1>{head}</h1>
            <div className="tag">
              Beta
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Banner.defaultProps = {
  head:"Head",
  subhead:"SubHead"
}

export default Banner;