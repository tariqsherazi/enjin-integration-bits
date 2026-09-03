import { ethers } from "ethers";


export const numToHex = (number)=>{
    const hex = ethers.utils.hexValue(number);
    console.log(hex);
    return hex;
}