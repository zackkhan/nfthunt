import React, {useEffect, useState} from 'react'
import {  useParams, useHistory } from "react-router-dom";
import SelectDropdown from '../../comps/selectDropdown'
import Banner from '../../comps/banner'
import Loader from '../../assets/covalent-logo-loop_dark_v2.gif'
import Alert from '../../assets/alert.svg'
import Back from '../../assets/Back.svg'
import Table from '../../comps/table'
import TimeSeries from '../../comps/timeseriesChart'
import axios from 'axios'
import './style.css'
import { CONFIG } from '../../config'
import moment from 'moment';



export default function CollectionView() {
  let { address, id } = useParams();
  const [nft, setNft] = useState([])
  const [graphData, setGraph] = useState([])
  const [weiData, setWei] = useState([])
  const [activeLoader, setLoader] = useState(true)
  const [graphLoader, setGraphLoader] = useState(true)
  const [collectionData, setData] = useState([])
  const [graphErr, setErr] = useState(false)
  const history = useHistory();
  const currentDay =moment().format('YYYY-MM-DD')
  
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const API_KEY = 'ckey_c2d8d88841e8485e9d5a94699c1'

  useEffect(()=>{
    handleCollection()
    handleNft()
  },[])

  // Handle Graph data
  const handleGraph = async(filter) => {
    setGraphLoader(true)
    setErr(false)
    setGraph([])
    setWei([])
    let from = moment().subtract(filter, 'days').format('YYYY-MM-DD')

    // If filter is 0 (All time), apply different parameters
    let api_call = filter > 0 ? 
      // 2 dates (from - to)
      `https://api.covalenthq.com/v1/${id}/nft_market/collection/${address}/?from=${from}&to=${currentDay}&key=${API_KEY}` 
      : 
      // 1 date (current date - all data before it)
      `https://api.covalenthq.com/v1/${id}/nft_market/collection/${address}/?to=${currentDay}&key=${API_KEY}`

    // Request for floor prices and add parameters to format for graph
      try{
        const resp = await axios.get(api_call)

        // Organize response data to insert into graph
        setGraph(resp.data.data.items.map(i => ({x:i.opening_date, y:i.floor_price_quote_7d})).reverse())
        setWei(resp.data.data.items.map(i => ({x:i.opening_date, y:i.floor_price_wei_7d})).reverse())

        setErr(false)
      }catch(error){
          setErr(true)
      }

      setGraphLoader(false)

  }


  // Request for collection data
  const handleCollection = async() => {
    try{
      const resp = await axios.get(`https://api.covalenthq.com/v1/${id}/nft_market/collection/${address}/?&key=${API_KEY}`)
      setData([...resp.data.data.items])
    }catch(error){
 
    }

    // Call endpoint with 7 day parameters as default for graph
    handleGraph(7)

  }

  // Request for nft collection (first 5)
  const handleNft = async() => {
    let resp;
    let collection = []
    try{
      resp = await axios.get(`https://api.covalenthq.com/v1/${id}/tokens/${address}/nft_token_ids/?quote-currency=USD&format=JSON&page-size=5&key=${API_KEY}`)

       // Request for nft metadata for display pictures
        for(let i of resp.data.data.items){
          try{
            let resp2 = await axios.get(`https://api.covalenthq.com/v1/${id}/tokens/${address}/nft_metadata/${i.token_id}/?quote-currency=USD&format=JSON&key=${API_KEY}`)
            
            collection.push(resp2.data.data.items[0].nft_data != null ? resp2.data.data.items[0].nft_data[0] : {external_data : {image: ""}})
          }
          catch(err){
          }
        }
        setNft([...collection])
        setLoader(false)
    }catch(err){
    }

  }
  
  return (
    <>
        <>
        <Banner
          head={'NFT Market Cap'}
          subhead={'Code Template'}
        />
        <div className="main">
          <div className="back" onClick={()=>{history.goBack()}}>
            <img src={Back}></img>
          </div>
          <div className="content">
            <div className="info">
              <div className="image">
                {activeLoader ? 
                <img src={Loader}></img>
                :
                  <img className="collection-img" onError={(event) => {
                  event.target.classList.add("error-image")
                  event.target.classList.remove("collection-img")
                  }} src={nft[0] ?.external_data?.image}></img>
                }
              </div>
              <div className="details">
                <div className="title-cont">
                  <h2>Collection Address</h2>
                  <h3>{address}</h3>
                  <table className="collection-table">
                    <tr className="title-row">
                      <td>Ticker Symbol</td>
                      <td>24hr Volume</td>
                      <td>24hr Sold Count</td>
                    </tr>
                    <tr className ="data-row">
                      <td>{collectionData[0]?.collection_ticker_symbol ? collectionData[0]?.collection_ticker_symbol : "null"}</td>
                      <td> {collectionData[0]?.volume_quote_day ? formatter.format(collectionData[0]?.volume_quote_day).split('.')[0]  : "null"}</td>
                      <td>{collectionData[0]?.unique_token_ids_sold_count_day ? collectionData[0]?.unique_token_ids_sold_count_day : "null"}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="graph-cont">
            {graphLoader &&
              <div className="graph-loader">
                <img src={Loader}></img>
              </div> 
            }
            {graphErr &&
              <div className="graph-err">
                No data available between these dates
              </div> 
            }
             <div className="graph-header">
              <h2>Floor Price </h2>
                <SelectDropdown
                  options={CONFIG.GRAPH_OPTIONS}
                  onChange={(e)=>{handleGraph(e.target.value)}}
                />
            </div>
            <div className="graph">
              <TimeSeries
                quote={graphData}
                wei={weiData}
              />
            </div>
          </div>
          <div className="bottom-section">
            <h2>NFT Preview</h2>
            {activeLoader ? 
            <div className="collection-load">
              <img src={Loader}></img>
            </div>
            :
            <div className="collection-display">
              {nft && nft.map((o,i)=>{
                return (
                    <div className="nft" key={i}>
                      <img onError={(event) => {
                        event.target.classList.add("error-image")
                        event.target.classList.remove("collection-img")
                        }} className="collection-img" key={i} src={o ?.external_data?.image} onClick={()=>{history.push(`/nft/${address}/${o.token_id}/${id}`)}}>
                      </img>
                  </div>
                )
              })}
            </div>
            }
          </div>
          </div>
          </>
    </>
  );

}