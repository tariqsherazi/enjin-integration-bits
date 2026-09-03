import { ethers } from "ethers";
import ActionTypes from "../contants/ActionTypes";
import ethMarketContractAbi from "../../abis/ethMarketContractAbi.json";
import ethMintingContractAbi from "../../abis/ethMintingContractAbi.json";
import polygonMarketContractAbi from "../../abis/polygonMarketContractAbi.json";
import polygonMintingContractAbi from "../../abis/polygonMintingContractAbi.json";
import { numToHex } from "../../utills/numberToHex";
import { WeiToETH } from "../../utills/convertWeiAndBnb";
import { ToastMessage } from "../../components";
import UniversalProvider from "@walletconnect/universal-provider";
import { Web3Modal } from "@web3modal/standalone";



export const loadBlockchainAction = (chain, address) => async (dispatch) => {
  // try {
  //   await Web3.givenProvider.enable();
  //   const web3 = new Web3(Web3.givenProvider);
  //   await web3.currentProvider.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [{ chainId: "0x13881" }],
  //   });

  //   let account = await web3.eth.getAccounts();
  //   account = account[0];
  //   let chainId = await web3.eth.getChainId();

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const accounts = await provider.listAccounts();
    let account = accounts[0];
    if (address?.toLowerCase() === account?.toLowerCase() || address === undefined) {
      const signer = await provider.getSigner();
      const { chainId } = await provider.getNetwork();
      if (chain === chainId) {
        const web3 = provider;
        const data = {
          account,
          web3,
          chainId,
          signer
        };
        dispatch({ type: ActionTypes.WEB3CONNECT, payload: data });
      } else {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: numToHex(chain) }],
        });
        const web3 = provider;
        const data = {
          account,
          web3,
          chainId,
          signer
        };
        dispatch({ type: ActionTypes.WEB3CONNECT, payload: data });
      }
    } else {
      console.log("Please connect correct wallet");
      ToastMessage("Error", "Please connect correct wallet", "error");
    }

  } catch (err) {
    console.log("errr", err);
  }
};

export const loadWalletConnectAction = (chain, address) => async (dispatch) => {
  try {
    const DEFAULT_PROJECT_ID = "1eccdcef1fec662a8e65ca062f39ed04"
    const DEFAULT_RELAY_URL = "wss://relay.walletconnect.com"

    const connector = await UniversalProvider.init({
      projectId: DEFAULT_PROJECT_ID,
      logger: "debug",
      relayUrl: DEFAULT_RELAY_URL,
    });

    const web3Modal = new Web3Modal({
      projectId: DEFAULT_PROJECT_ID || "",
      walletConnectVersion: 2,
    });


    connector.on("display_uri", async (uri) => {
      console.log("EVENT", "QR Code Modal open");
      web3Modal?.openModal({ uri });
    });

    // Subscribe to session ping
    connector.on("session_ping", ({ id, topic }) => {
      console.log("EVENT", "session_ping");
      console.log(id, topic);
    });

    // Subscribe to session event
    connector.on("session_event", ({ event, chainId }) => {
      console.log("EVENT", "session_event");
      console.log(event, chainId);
    });

    // Subscribe to session update
    connector.on(
      "session_update",
      ({ topic, session }) => {
        console.log("EVENT", "session_updated");
      },
    );

    // Subscribe to session delete
    connector.on("session_delete", ({ id, topic }) => {
      console.log("EVENT", "session_deleted");
      console.log(id, topic);
      // resetApp();
    });
    let rpc;
    if (chain === 5) {
      rpc = { "5": "https://rpc.goerli.mudit.blog", }
    }
    else {
      rpc = {
        "80001": "https://rpc-mumbai.matic.today",
      }
    }

      await connector.connect({
      namespaces: {
        eip155: {
          methods: [
            "eth_sendTransaction",
            "eth_signTransaction",
            "eth_sign",
            "personal_sign",
            "eth_signTypedData",
          ],
          chains: [`eip155:1`],
          events: ["chainChanged", "accountsChanged"],
          rpcMap: rpc
        },
      },
      // pairingTopic: pairing?.topic,
    });

    const accounts = await connector.enable();
    let account = accounts[0]
    console.log("accounts", accounts);

    web3Modal?.closeModal();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const { chainId } = await provider.getNetwork();

    if (chain === chainId) {
      const web3 = provider;
      const data = {
        account,
        web3,
        chainId,
        signer
      };
      console.log("data", data)
      dispatch({ type: ActionTypes.WEB3CONNECT, payload: data });

    }
  } catch (err) {
    console.log("errr", err);
  }
};



export const logoutWallet = () => async (dispatch) => {
  try {
    let account = null;
    account = null;
    let web3 = null;
    let chainId = null;
    const data = {
      web3,
      account,
      chainId,
    };

    dispatch({ type: ActionTypes.WEB3DISCONNECT, payload: data });
  } catch (err) {
    console.log("errr", err);
  }
};


export const updateAccount = (account) => async (
  dispatch,
) => {
  try {
    const data = {
      account,
    };
    dispatch({ type: ActionTypes.WEB3CONNECT, payload: data });
  } catch (err) {
    console.error('Failed to update account', err);
    throw err;
  }
};


export const loadContractIns = () => async (dispatch) => {
  const ethInfuraIns = "https://goerli.infura.io/v3/e556d22112e34e3baab9760f1864493a";
  const polygonInfuraIns = "https://polygon-mumbai.infura.io/v3/e556d22112e34e3baab9760f1864493a";
  try {

    //ethereum
    const ethProvider = new ethers.providers.JsonRpcProvider(ethInfuraIns);
    const ethMarketPlaceContract = "0x1E15394A6D3b642d9e06a4238D1EC70baC4ae1d5";
    const ethMintingConract = "0x8A59905976bD8D8C9A7D273909A93281a51A4842";
    const ethMarketContractIns = new ethers.Contract(ethMarketPlaceContract, ethMarketContractAbi, ethProvider);
    const ethMintingContractIns = new ethers.Contract(ethMintingConract, ethMintingContractAbi, ethProvider);

    //polygon
    const polygonProvider = new ethers.providers.JsonRpcProvider(polygonInfuraIns);
    const polygonMarketPlaceContract = "0x7Af5243b7F331217e2D37b19FE773B2C0A5D4301";
    const polygonMintingConract = "0x97C49dFeB7ff0bD5006B02fD59912Ab63f5D4216";
    const polygonMarketContractIns = new ethers.Contract(polygonMarketPlaceContract, polygonMarketContractAbi, polygonProvider);
    const polygonMintingContractIns = new ethers.Contract(polygonMintingConract, polygonMintingContractAbi, polygonProvider);


    // const imguri = extractNFTImage(ethMintingContract, 0)
    // console.log(imguri);
    // const auctions = await contract.methods.auctions(0).call();


    dispatch({ type: ActionTypes.LOAD_CONTRACT, payload: { ethMarketContractIns, ethMintingContractIns, polygonMarketContractIns, polygonMintingContractIns } });
    dispatch({
      type: "MATIC_CHAIN",
      contractData: {
        marketContract: polygonMarketContractIns,
        mintContract: polygonMintingContractIns,
        chain: 80001
      },
    })

    getEmoteItems(ethMarketContractIns, polygonMarketContractIns).then((result) => {
      const { maticList, ethList } = result;

      dispatch({ type: "LOAD_FIXED_ITEMS", payload: { maticList, ethList } });
      dispatch({
        type: "MATIC_CHAIN_FIXED",
        fixedItemData: maticList,
      });
    });

    getAuctions(ethMarketContractIns, polygonMarketContractIns).then((result) => {
      const { maticAuctionsList } = result;
      dispatch({
        type: "MATIC_CHAIN_AUCTION",
        auctionItemData: maticAuctionsList,
      });
    })


  } catch (err) {
    console.log("errr", err);
  }
};


// getting fixed prices
const getEmoteItems = async (ethMarketContractIns, polygonMarketContractIns) => {
  const maticcombined = {};
  const ethcombined = {};

  const maticArray = Number(await polygonMarketContractIns.getAllFixedPrices());
  let tokenID = "tokenid";

  //polygon
  for (let i = 0; i < maticArray; i++) {
    const obj = await polygonMarketContractIns.Fixedprices(i);
    const id = Number(obj[tokenID]);

    if (maticcombined[id]) {
      maticcombined[id].owners.push({
        owner: obj.owner,
        copies: Number(obj.copiesForSale),
        newOwner: obj.newowner,
        price: WeiToETH(obj.price),
        fixedid: Number(obj.fixedid),
      });
    } else {
      maticcombined[id] = {
        tokenid: id,
        isSold: obj.isSold,
        owners: [
          {
            owner: obj.owner,
            copies: Number(obj.copiesForSale),
            newOwner: obj.newowner,
            price: WeiToETH(obj.price),
            fixedid: Number(obj.fixedid),
          }
        ]
      };
    }
  }

  const maticList = Object.values(maticcombined);

  //ethereum

  const ethArray = Number(await polygonMarketContractIns.getAllFixedPrices());;

  for (let i = 0; i < ethArray; i++) {
    const ethobj = await polygonMarketContractIns.Fixedprices(i);
    const ethid = Number(ethobj[tokenID]);

    if (ethcombined[ethid]) {
      ethcombined[ethid].owners.push({
        owner: ethobj.owner,
        copies: Number(ethobj.copiesForSale),
        newOwner: ethobj.newowner,
        price: WeiToETH(ethobj.price),
        fixedid: Number(ethobj.fixedid),
      });
    } else {
      ethcombined[ethid] = {
        tokenid: ethid,
        isSold: ethobj.isSold,
        owners: [
          {
            owner: ethobj.owner,
            copies: Number(ethobj.copiesForSale),
            newOwner: ethobj.newowner,
            price: WeiToETH(ethobj.price),
            fixedid: Number(ethobj.fixedid),
          }
        ]
      };
    }
  }

  const ethList = Object.values(ethcombined);

  return { maticList, ethList };
};

//getting auctions
const getAuctions = async (ethMarketContractIns, polygonMarketContractIns) => {
  const maticAuctionsList = [];
  const maticArray = Number(await polygonMarketContractIns.getAllAuctions());

  for (let i = 0; i < maticArray; i++) {
    const obj = await polygonMarketContractIns.auctions(i);
    maticAuctionsList.push(obj);
  }


  const ethAuctionsList = [];
  const ethArray = Number(await polygonMarketContractIns.getAllAuctions());

  for (let i = 0; i < ethArray; i++) {
    const obj = await polygonMarketContractIns.auctions(i);
    ethAuctionsList.push(obj);
  }

  return { maticAuctionsList, ethAuctionsList };
};
