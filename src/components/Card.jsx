import React from "react";
import "../styles/card.scss";

function Card(nft_collection) {
	return (
		<div className="product_container">
			<div className="image_container">
				<img src={""} alt={"API loading..."} />
			</div>
			<div>
				<h3>{nft_collection.collection_name}</h3>
				<p className="product_description">{"No description provided."}</p>
				<span>
        <button>ETH</button>
				</span>
			</div>
			<div className="votes">
				<span className="angle_up">▲</span>
				<button
					className="votes_count"
					onClick={() => nft_collection.updateCount(nft_collection.collection_address)}
				>
					{nft_collection.votes_count}
				</button>
			</div>
		</div>
	);
}

export default Card;
