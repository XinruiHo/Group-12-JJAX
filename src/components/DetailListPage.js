// This page contains the detail of a single fixed price NFT and users can buy it.

import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import JJAXJSON from '../JJAX.json';

export function Buy(tokenId){
    console.log('loading')
    async function buyNFT(tokenId) {
        try {
            console.log(tokenId)
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            //Pull the deployed contract instance
            let contract = new ethers.Contract(JJAXJSON.address, JJAXJSON.abi, signer);
            console.log('contract created')

            let transaction = await contract.buyFixedPriceListing(tokenId);
            await transaction.wait();
    
            alert('You successfully bought the NFT!');
        }
        catch(e) {
            console.log("Upload Error"+e)
        }
}
buyNFT(tokenId)
}
