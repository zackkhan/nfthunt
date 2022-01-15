import React, {useEffect, useState} from 'react'
import {  useParams, useHistory } from "react-router-dom";
import SelectDropdown from '../../comps/selectDropdown'
import Banner from '../../comps/banner'
import NftDetails from '../../comps/nftDetails'
import Loader from '../../assets/covalent-logo-loop_dark_v2.gif'
import Table from '../../comps/table'
import Back from '../../assets/Back.svg'
import axios from 'axios'
import './style.css'



export default function NFTView() {
  let { address, id, chainId } = useParams();
  const [nft, setNft] = useState({})
  const [activeLoader, setLoader] = useState(true)
  const API_KEY = 'ckey_c2d8d88841e8485e9d5a94699c1'
  const history = useHistory()

  useEffect(()=>{
    handleNft()
  },[])

  // Request for nft metadata 
  const handleNft = async() => {
    const resp = await axios.get(`https://api.covalenthq.com/v1/${chainId}/tokens/${address}/nft_metadata/${id}/?quote-currency=USD&format=JSON&key=${API_KEY}`)
    console.log(resp)
    setNft(resp.data.data.items[0].nft_data !== null ? resp.data.data.items[0].nft_data[0] : {external_data : {image: ""}})
    setLoader(false)
  }

  return (
    <>
      {activeLoader ? 
        <div className="load">
          <img  src={Loader}></img>
        </div> 
      :
      <>
        <Banner
          head={'NFT Market Cap'}
          subhead={'Code Template'}
        />
        <div className="main">
          <div className="back" onClick={()=>{history.goBack()}}>
            <img src={Back}></img>
          </div>
          <NftDetails
            data={nft}
          />
        </div>
      </>
      }
    </>
  )
}