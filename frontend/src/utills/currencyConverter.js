import axios from 'axios';

// export const USDTOETH = async(amount)=>{
//     try {
//         const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');

//         const price = await response.data.ethereum.usd;

//         return (amount / price);
//     } catch (error) {
//         console.log(error);
//     }
// }

export const USDTOETH = async(amount)=>{
    try {
        const response = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=ETH');

        const price = await response.data.data.rates.USD;

        return (amount / price);
    } catch (error) {
        console.log(error);
    }
}

export const USDTOMATIC = async(amount)=>{
    try {
        const response = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=MATIC');

        const price = await response.data.data.rates.USD;
        console.log(amount / price);

        return (amount / price);
    } catch (error) {
        console.log(error);
    }
}

export const ETHTOUSD = async(amount)=>{
    try {
        const response = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=ETH');

        const price = await response.data.data.rates.USD;
        const finalAmount = amount * price;
        return finalAmount;
    } catch (error) {
        console.log(error);
    }
}

export const MATICTOUSD = async(amount)=>{
    try {
        const response = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=MATIC');

        const price = await response.data.data.rates.USD;
        console.log(amount / price);

        return (amount * price);
    } catch (error) {
        console.log(error);
    }
}