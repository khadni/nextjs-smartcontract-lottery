import { useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddresses } from "../constants/index";

export default function LotteryEntrance() {
  const { Moralis, isWeb3Enabled } = useMoralis();
  const { runContractFunction: enterLottery } = useWeb3Contract({
    abi: abi,
    contractAddress: "4", // manual input
    functionName: "enterLottery",
    params: {},
    //   msgValue: //
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: "4", // manual input
    functionName: "getEntranceFee",
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        const entranceFeeFromContract = await getEntranceFee();
        console.log(entranceFeeFromContract);
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  return <div className="container">coucou</div>;
}
