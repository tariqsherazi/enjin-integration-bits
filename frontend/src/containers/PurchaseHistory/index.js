import React, { useState, useEffect } from "react";
import { profile2 } from "../../assets";
import { ethers , EtherscanProvider} from 'ethers';
import { NavbarComponent, Transactions } from "../../components";
import { Dropdown, Button, Space, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./css/index.css";
import { useSelector } from "react-redux";
import polygonMarketContractAbi from "../../abis/polygonMarketContractAbi.json";
import ethMarketContractAbi from "../../abis/ethMarketContractAbi.json";
import { GET_ALL_NFTS_WITHOUT_ADDRESS } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { timestampToDate } from "../../utills/timeToTimestamp";
import { WeiToETH } from "../../utills/convertWeiAndBnb";

const PurchaseHistory = () => {
  const { loading, error, data, refetch } = useQuery(
    GET_ALL_NFTS_WITHOUT_ADDRESS
  );
  const { userData } = useSelector((state) => state.address.userData);
  const {contractData} = useSelector((state) => state.chain.contractData);

  const [transactionHistory, setTransactionHistory] = useState([]);

  const [dropdownValue, setDropdownValue] = useState("Last Week");

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);

  useEffect(() => {
    const getTransactionHistory = async () => {
      try {
        // Initialize Etherscan provider with your API key
        const provider = new ethers.providers.EtherscanProvider(contractData.chain == 5? "goerli" : "maticmum");

        const contractInterface = new ethers.utils.Interface(contractData.chain == 5 ?ethMarketContractAbi : polygonMarketContractAbi);

        // Get the transaction history for the wallet address

        const history = (await provider.getHistory(`${userData?.address}`)).filter(item => item.to == contractData.marketContract.address);

        history.map(async(item)=>{
          const inputData = item.data || '0x';
          const decodedMethod = contractInterface.parseTransaction({ data: inputData });

          if(decodedMethod.name == "BuyFixedPriceItem"){
            const {chainId} = await provider.getTransaction(item.hash);
            const recp = await provider.getTransactionReceipt(item.hash);
            
            if(recp.status === 1){
              const price = WeiToETH(`${Number(item.value)}`);
              const date = timestampToDate((item.timestamp) * 1000);
              console.log(price);
              const decodeData = contractData.marketContract.interface.decodeFunctionData('BuyFixedPriceItem', inputData);
              if(decodeData){
                const fixedDet =  await contractData.marketContract.Fixedprices(Number(decodeData.fixedid));
                data?.getAllNftsWithoutAddress?.map((e,i)=>{
                if (Number(fixedDet[9]) == e.token_id){
                  let obj ={
                    name: e.name,
                    date: date,
                    price: price
                  }
                  console.log(obj);
                  setTransactionHistory((prev)=>{
                    return [...prev, obj]
                  });
                
                }
              })
              }
            }
          }

        })

        
        // const decodedMethod = contractInterface.parseTransaction({ data: inputData });

        // const decodeData = contractData.marketContract.interface.decodeFunctionData('BuyFixedPriceItem', inputData);

        // const fixedDet = await contractData.marketContract.Fixedprices(Number(decodeData.fixedid));

        // const price = Number(history[1].value);

        // console.log('Method Name:', decodedMethod.name, price, Number(fixedDet[9]));

        // Set the transaction history in state

      } catch (error) {
        console.error('Error retrieving transaction history:', error);
      }
    };

    const fetchData = async () => {
      await getTransactionHistory();
    };
    
    fetchData();

  }, [contractData, userData]);


  console.log(transactionHistory);


  const menu = (
    <Menu
      onClick={(e) => setDropdownValue(e.key)}
      items={[
        {
          label: "Last Week",
          key: "Last Week",
        },
        {
          label: "Last Month",
          key: "Last Month",
        },
        {
          label: "Last Year",
          key: "Last Year",
        },
      ]}
    />
  );
  return (
    <div className={`${backgroundTheme}`} style={{ minHeight: "100vh" }}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"8"}
        headerText={"Purchase History"}
      />
      <div className="container">
        <div
          className="d-flex justify-content-between py-5 transactionFirstView"
          style={{ alignItems: "center" }}
        >
          <div className="d-flex">
            {/* <img src={profile2} style={{ width: 70, height: 70 }} /> */}
            <div className="ms-3">
              <span className={textColor2}>Hi,</span>
              <p className={textColor}>{userData?.full_name}</p>
            </div>
          </div>
          <Dropdown overlay={menu} className="dropdownView mobMargin">
            <Button>
              <Space>
                {dropdownValue}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div style={{ border: "1px solid #D54343" }}></div>
        <Transactions checkIcon data={transactionHistory} />
      </div>
    </div>
  );
};

export default PurchaseHistory;
