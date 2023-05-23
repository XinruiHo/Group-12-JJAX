// This page contains the detail of a single acution NFT and users can buy it.
import React, { useState } from "react";
import Navbar from "./Navbar";
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";


export default function NFTPage (props) {
  location = useLocation()
  const [data, updateData] = useState({});
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");
  const [bidPrice, setBidPrice] = useState("");
  const [bidDeadline, setBidDeadline] = useState("");
  

async function getNFTData(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(JJAXJSON.address, JJAXJSON.abi, signer)
    //create an NFT Token
    var tokenURI = await contract.tokenURI(tokenId);
    tokenURI = GetIpfsUrlFromPinata(tokenURI);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
        price: meta.price,
        tokenId: tokenId,
        image: meta.image,
        name: meta.name,
        description: meta.description,
    }
    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr)
    updateCurrAddress(addr);
}


  const handleBidPriceChange = (e) => {
    setBidPrice(e.target.value);
  };

  const handleBidDeadlineChange = (e) => {
    setBidDeadline(e.target.value);
  };

  return(
    <div style={{"min-height":"100vh"}}>
      <Navbar></Navbar>
      <div className="flex ml-20 mt-20">
        <img src={data.image} alt="" className="w-2/5" />
        <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
          <div>
            Name: {data.name}
          </div>
          <div>
            Description: {data.description}
          </div>
          <div>
            Price: <span className="">{data.price + " ETH"}</span>
          </div>
          <div>
            {currAddress !== data.owner && currAddress !== data.seller ? (
              <>
                <div>
                  BidPrice:
                  <input
                    type="text"
                    value={BidPrice}
                    onChange={handleBidPriceChange}
                  />
                </div>
                <div>
                  Bid Deadline:
                  <input
                    type="text"
                    value={bidDeadline}
                    onChange={handleBidDeadlineChange}
                  />
                </div>
                <button
                  className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={() => buyNFT(tokenId)}
                >
                  Place Bid
                </button>
              </>
            ) : (
              <div className="text-emerald-700">
                You are the owner of this NFT
              </div>
            )}
            <div className="text-green text-center mt-3">{message}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
