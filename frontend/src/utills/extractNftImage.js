export const extractNFTImage = (contract, tokenId) => {
  const getNFTMetadata = async () => {
    const result = await contract.uri(tokenId);

    console.log(result);

    const ipfsURL = addIPFSProxy(result);

    const herokuProxy = "https://cors-anywhere.herokuapp.com/";

    const uri = herokuProxy + ipfsURL;

    const request = new Request(uri);
    const response = await fetch(request);
    const metadata = await response.json();

    const image = addIPFSProxy(metadata.image);
    console.log(image);
    return image;
  };

  getNFTMetadata();

  // const addIPFSProxy = (ipfsHash)=>{
  //     const URL = "https://infura-ipfs.io/ipfs/"
  //     const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
  //     const ipfsURL = URL + hash

  //     console.log(ipfsURL) // https://<subdomain>.infura-ipfs.io/ipfs/<ipfsHash>
  //     return ipfsURL
  // }
  const addIPFSProxy = (ipfsHash) => {
    const URL = "https://infura-ipfs.io/ipfs/";
    const hash = ipfsHash.replace(/^(ipfs:\/\/)?/, "");
    const ipfsURL = URL + hash;

    console.log(ipfsURL); // https://<subdomain>.infura-ipfs.io/ipfs/<ipfsHash>
    return ipfsURL;
  };
};
