import env from "../../environment";

const auth ="Basic " + Buffer.from(env.INFURA_API_KEY + ":" + env.INFURA_SECRET).toString('base64');

export const getAllNftsByAddress = async(address, networkId, contract)=>{
    const infura_url = `https://nft.api.infura.io/networks/${networkId}/`;

    const request_url = infura_url + 'accounts/' + address + '/assets/nfts/';

    const request = new Request(request_url);
    const response = await fetch(request,{
        headers: {
        authorization: auth,
      }});

    const accountDetails = (await response.json()).assets;

    let tokenIds = [];

    accountDetails.map((item)=>{
        if (item.contract == contract.toLowerCase()) {
            tokenIds.push(item.tokenId);
        }
    })
   
    return tokenIds;
}


export const getOwnersOfTokenId = async(tokenId, networkId, contract)=>{
    const infura_url = `https://nft.api.infura.io/networks/${networkId}/`;

    const request_url = infura_url + 'nfts/' + contract +'/'+ tokenId + '/owners/';

    const request = new Request(request_url);
    const response = await fetch(request,{
        headers: {
        authorization: auth,
      }});

    console.log(await response.json());
}