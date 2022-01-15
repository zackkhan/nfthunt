import React, {useEffect, useState} from 'react'
import './style.css'

const SelectDropdown = ({options, onChange}) => {
  return (
    <select className="select" onChange={onChange} >
      {options.map((o, i)=>{
        return(
          <option key={i} value={o.value}>{o.name}</option>
        )
      })}
    </select>
  )
}


export default SelectDropdown