export const GetIpfsUrl = (NFTUrl) => {
    var IPFSUrl = NFTUrl.split("/")[2];
    IPFSUrl = "https://dweb.link/ipfs/"+IPFSUrl;
    return IPFSUrl;
};