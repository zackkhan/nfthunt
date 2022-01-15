import React, {useEffect, useState} from 'react'
import './style.css'

const Table = ({data, onClick}) => {

  var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <table className="table">
      <tr className="title-row">
        <th className="collection-name">Collection</th>
        <th className="align-right">Market Cap</th>
        <th className="align-right">24hr Volume </th>
        <th className="align-right">Avg Price</th>
        <th className="align-right"># Transaction</th>
        <th className="align-right"># Wallets</th>
      </tr>
      {data && data.map((o,i)=>{
        return (
          <tr key={i} className="data-row" onClick={()=>{onClick(o.collection_address)}}>
            <td className="collection-name" style={{fontWeight:"600"}}>{o.collection_name ? o.collection_name : "null"}</td>
            <td className="table-data">{o.market_cap_quote ? formatter.format(o.market_cap_quote).split('.')[0] : "null"}</td>
            <td className="table-data">{o.volume_quote_24h ? formatter.format(o.volume_quote_24h).split('.')[0] : "null"}</td>
            <td className="table-data">{o.avg_volume_quote_24h ? formatter.format(o.avg_volume_quote_24h).split('.')[0] : "null"}</td>
            <td className="table-data">{o.transaction_count_alltime ? numberWithCommas(o.transaction_count_alltime) : "null"}</td>
            <td className="table-data">{o.unique_wallet_purchase_count_alltime ? numberWithCommas(o.unique_wallet_purchase_count_alltime) : "null"}</td>
          </tr>
        )
      })}
    </table>
  )
}


export default Table;