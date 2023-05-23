//The NFT list page is the main page, 
//The will contains 2 columns with different type of NFT(fixed price or acution)
import JJAXJSON from "../JJAX.json";
import axios from "axios";
import { useState ,useEffect} from "react";
import { GetIpfsUrl } from "../utils/GetURL";
import { Card ,Row, Col,Space,Button} from 'antd';
import { Buy } from "./DetailListPage";

export default function Marketplace() {
    
const [data, updateData] = useState();
const [isLoading, setIsLoading] = useState(true);
const ethers = require('ethers');
const BorderBox = ({ children }) => {
    return (
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
      <Card
        style={{ border: '1px solid #d9d9d9', borderRadius: 4, background: 'rgba(255, 255, 255, 0.5)', width: '50%',justifyContent: 'center'}}
        bodyStyle={{ padding: 16 }}
      >
        {children}
      </Card>
      </div>
    );
  };


async function getAllNFTs() {
    
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(JJAXJSON.address, JJAXJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.viewFixedPriceListings()
    

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        const response = await axios.get(GetIpfsUrl(tokenURI))
            
        const meta = response.data;
 
        let price = ethers.utils.formatUnits(i.price.toString(), 'wei');
        let item = {
            price: price/100,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            image: meta.image,
            music: meta.music,
            name: meta.name,
            description: meta.description,
            author: meta.author,
            type: meta.type,

        }

        return item;
    }))

    updateData(items);
    setIsLoading(false);
}
    
async function NFTs(){
    try {
    await getAllNFTs();
  } catch (error) {
    if (error.message.includes("unknown account #0")) {
      console.log("Wallet account is not available. Skipping NFT fetching.");
    } else {
      console.log("Error occurred during NFT fetching:", error);

    }

  }
}
useEffect(() => {
    const intervalId = setInterval(() => {

      NFTs();
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  if (isLoading) {
    return <p>Loading...</p>; 
  }
    return (
<div>
  <Space direction="vertical" size={16}>
    {data && Array.isArray(data) && data.map((item, index) => (
      <BorderBox>
      <Row gutter={16} key={index}>
      <Col span={6}>
      <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                }}>
        <img src={GetIpfsUrl(item.image)} alt="Image" style={{ width: '50%', height: 'auto' }}/>
        </div>
      </Col>
      <Col span={18}>
        
          <div key={index}>
              <h3>Name:{item.name}</h3>
              <p>Author: {item.author}</p>
              <p>Type: {item.type}</p>
              <p>Description:{item.description}</p>
              <p>Price: {item.price}</p>
              <p>Seller: {item.seller}</p>
              
              </div> 
      </Col>
    </Row>
    </BorderBox>
    ))}
  </Space>
</div>
    );
    
    }
