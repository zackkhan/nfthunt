import React, {useEffect, useState} from 'react'
import Alert from '../../assets/alert.svg'
import './style.css'


const NftDetails = ({data}) => {
  return (
    <div className="nft-cont">
      <div className="img-container">
        <img onError={(event) => {
                      event.target.classList.add("error-image")
                      event.target.classList.remove("nft-img")
                      }} className="nft-img" src={data ?.external_data?.image}></img>
      </div>
      <div className="nft-details">
        <h1>{data ?.external_data?.name}</h1>
        <h2>Token ID : {data ?.token_id}</h2>
        <p>{data ?.external_data?.description}</p>
        <table className="nft-table"> 
          {data ?.external_data?.attributes ? 
          <>
          {data.external_data.attributes.map((o,i)=>{
              return <tr key={i}>
                        <td> {o.trait_type} </td>
                        <td> {o.value} </td>
                    </tr>
          })}
          </>
          : null}
        </table>
      </div>
    </div>
  )
}


export default NftDetails