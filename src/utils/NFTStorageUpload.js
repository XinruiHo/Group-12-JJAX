import { NFTStorage, Blob } from 'nft.storage'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERDNDc2QmFCMUM3ZjkyNjNERTJFODEyOTRkM0ZkMzZlRDQ0NjhmMTYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NDQwNTk2NzQyMiwibmFtZSI6IkpKQVgifQ.ToSoRLEnO86sxC94pyABYsLRPxPF0uGvL8plxKqSbIs'
export const uploadToIPFS = async(file) => {
    const client = new NFTStorage({ token })
    const content = file
    try{
       const cid = await client.storeBlob(new Blob([content]))
    console.log('https://dweb.link/ipfs/'+cid)
    return{ 
        success: true,
        StorageURL: 'ipfs://' + cid ,
    }}catch(e){
        console.error(e);
        return {
          success: false,
          message: e.message,
        };
      }

}

  export const uploadJSON = async(json) => {
  const client = new NFTStorage({ token })
  const content = JSON.stringify(json);
  try{
    const cid = await client.storeBlob(new Blob([content]))
 console.log('https://dweb.link/ipfs/'+cid)
 return{ 
     success: true,
     StorageURL: 'ipfs://' + cid ,
 }}catch(e){
     console.error(e);
     return {
       success: false,
       message: e.message,
     };
   }


}

