import React, {useEffect, useState} from 'react'
import Card from "./Card";
import Sidebar from "./Sidebar";
// import config from "../config.js";
// import SelectDropdown from '../comps/selectDropdown'
// import Table from '../comps/table'
// import Banner from '../comps/banner'
import { useNavigate } from "react-router-dom";
import { CONFIG } from '../config'
// TODO: Add loader
// import Loader from '../../assets/covalent-logo-loop_dark_v2.gif'
import axios from 'axios';
// import './style.css'

// const nft_collection = [
// {
// "chain_id":1
// "collection_name":"Sandbox's LANDs"
// "collection_address":"0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a"
// "volume_wei_24h":"10503076942328900000000"
// "volume_quote_24h":34918684
// "avg_volume_wei_24h":"22932482406831700000"
// "avg_volume_quote_24h":76241.67
// "contract_deployment_at":NULL
// "market_cap_wei":"240605775622884000000000"
// "market_cap_quote":799921540
// "transaction_count_alltime":84228
// "unique_wallet_purchase_count_alltime":17652
// "unique_token_ids_sold_count_alltime":36948
// "max_price_wei":"150000000000000000000"
// "max_price_quote":498692.22
// "floor_price_wei_7d":"15670121050250700000"
// "floor_price_quote_7d":52097.117
// "gas_quote_rate":3324.6147
// "quote_currency":"USD"
// "opening_date":"2022-01-14"
// }, .... This is what this looks like! 
// ];

const images = [
	{
		img:
			"https://ph-avatars.imgix.net/304202/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"
	},
	{
		img:
			"https://ph-avatars.imgix.net/1456069/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop&dpr=2"
	},
	{
		img:
			"https://ph-avatars.imgix.net/17305/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop&dpr=2"
	},
	{
		img:
			"https://ph-avatars.imgix.net/1263444/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop&dpr=2"
	},
	{
		img:
			"https://ph-avatars.imgix.net/826276/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"
	},
	{
		img:
			"https://ph-avatars.imgix.net/2395344/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=38&h=38&fit=crop"
	},
	{
		img:
			"https://ph-avatars.imgix.net/94353/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"
	},
	{
		img:
			"https://ph-avatars.imgix.net/166755/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"
	},
	{
		img:
			"https://ph-avatars.imgix.net/2395344/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"
	},
	{
		img:
			"https://ph-avatars.imgix.net/2097425/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=38&h=38&fit=crop"
	},
	{
		img:
			"https://ph-avatars.imgix.net/2096165/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"
	},
	{
		img:
			"https://ph-avatars.imgix.net/304202/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop"
	}
];

// const API_KEY = 'ckey_c2d8d88841e8485e9d5a94699c1';
class Cards extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}
	updateCount = collection_address => {
		let updatedData = this.state.data.map(nft_collection => {
			if (nft_collection.collection_address === collection_address) {
        if (nft_collection.votes_count === null) {
          nft_collection.votes_count = 0
        } 
				nft_collection.votes_count += 1;
			}
			return nft_collection;
		});
		this.setState({ data: updatedData });
	};
  // TODO: when we make it interoperable, need to change the "1" to an abstract chain id. don't know how to do that yet dynamically via dropdown yet so will be eth for now. Good thing is this will only load nfts on that chain so! 
  componentDidMount() {
		fetch("https://api.covalenthq.com/v1/1/nft_market/?&key=ckey_c2d8d88841e8485e9d5a94699c1", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			}
		})
			.then(res => res.json())
			.then(resData => {
				console.log(resData);
				this.setState({ data: resData.data.items });
			})
			.catch(err => console.log(err));
	}
  
	render() {
		return (
			<>
				<div className="container">
					<div className="product_list">
						{this.state.data.map(nft_collection => (
							<Card {...nft_collection} updateCount={this.updateCount} />
						))}
					</div>
					<div className="side_container">
						<Sidebar data={images} />
					</div>
				</div>
			</>
		);
	}
}
export default Cards;