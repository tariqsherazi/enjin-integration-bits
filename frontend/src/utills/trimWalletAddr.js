export const trimWallet = (str) => {
    var res = str.slice(0, 5) + "...." + str.slice(37, 42);
    return res;
}