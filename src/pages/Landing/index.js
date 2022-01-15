import React, {useEffect, useState} from 'react'
import SelectDropdown from '../../comps/selectDropdown'
import Table from '../../comps/table'
import Banner from '../../comps/banner'
import { useHistory } from "react-router-dom";
import { CONFIG } from '../../config'
import Loader from '../../assets/covalent-logo-loop_dark_v2.gif'
import axios from 'axios';
import './style.css'


export default function LandingPage() {
    const history = useHistory();
    const [chain, setChain] = useState(1)
    const [market, setMarket] = useState([])
    const [activeLoader, setLoader] = useState(true)
    const API_KEY = 'ckey_c2d8d88841e8485e9d5a94699c1'

  
    useEffect(()=>{
      handleMarket(chain)
    },[chain])

    // Request for market (global view)
    const handleMarket = async(id) => {
      setLoader(true)
      try{
        const resp = await axios.get(`https://api.covalenthq.com/v1/${id}/nft_market/?&key=${API_KEY}`)
        setMarket(resp.data.data.items)
        setLoader(false)
      }catch (error) {
      }     
    }

    return (
      <>
      <Banner
        head={'NFT Market Cap'}
        subhead={'Code Template'}
      />
      <div className = "main">
        <div className="content">
          <div className="select-chain">
            <SelectDropdown
                options={CONFIG.FILTER_OPTIONS}
                onChange={(e)=>{setChain(e.target.value)}}
            />
          </div>
          {activeLoader ? 
          <div className="load">
            <img  src={Loader}></img>
          </div> 
          :
          <Table
            onClick={(id) =>{ history.push(`/collection/${id}/${chain}`)}}
            data={market}
          />
          }
        </div>
      </div>
      </>
    )
  
}