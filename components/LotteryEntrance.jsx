import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddresses } from "../constants/index";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";
import { info } from "autoprefixer";

export default function LotteryEntrance() {
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("");
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();

  const dispatch = useNotification();

  const chainId = parseInt(chainIdHex);

  const lotteryAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const {
    runContractFunction: enterLottery,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "enterLottery",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUI() {
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    const numPlayersFromCall = (await getNumberOfPlayers()).toString();
    const recentWinnerFromCall = (await getRecentWinner()).toString();
    setEntranceFee(entranceFeeFromCall);
    setNumPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async (tx) => {
    handleNewNotifOne();
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI();
  };

  const handleNewNotifOne = () => {
    dispatch({
      type: "info",
      message: "Transaction sent",
      title: "Tx notification",
      position: "topR",
      icon: "bell",
    });
  };
  const handleNewNotification = () => {
    dispatch({
      type: "success",
      message: "Transaction complete",
      title: "Tx notification",
      position: "topR",
      icon: "bell",
    });
  };

  return (
    <div>
      <div className="px-4 py-16 mx-auto text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 sm:text-5xl">
          <span className="block">Play the web3 lottery on Rinkeby</span>
        </h2>
        <p className="mt-4 text-2xl leading-6 text-blue-400">
          Winner takes it all.
        </p>
        {lotteryAddress ? (
          <>
            <button
              onClick={async function () {
                await enterLottery({
                  onSuccess: handleSuccess,
                  onError: (error) => console.log(error),
                });
              }}
              className="inline-flex items-center justify-center w-full px-6 py-4 mt-8 text-lg font-medium text-white border border-transparent rounded-md sm:hidden hover:bg-indigo-400 sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500"
              disabled={isLoading || isFetching}
            >
              {isLoading || isFetching ? (
                <div className="w-8 h-8 border-b-2 rounded-full animate-spin spinner-border"></div>
              ) : (
                <div>Enter the next round (0.01 ETH) </div>
              )}
            </button>
            <div className="flex items-center justify-center px-5 py-5 pt-12 min-w-screen">
              <div className="w-full max-w-3xl">
                <div className="-mx-2 md:flex">
                  <div className="w-full px-2 md:w-1/3">
                    <div className="mb-4 rounded-lg shadow-sm">
                      <div className="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl">
                        <div className="relative px-3 pt-8 pb-10 text-center">
                          <h4 className="text-sm leading-tight text-gray-500 uppercase">
                            Current players
                          </h4>
                          <h3 className="my-3 text-3xl font-semibold leading-tight text-gray-700">
                            {numPlayers}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-2 md:w-1/3">
                    <div className="mb-4 rounded-lg shadow-sm">
                      <div className="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl">
                        <div className="relative px-3 pt-8 pb-10 text-center">
                          <h4 className="text-sm leading-tight text-gray-500 uppercase">
                            Current Lottery balance
                          </h4>
                          <h3 className="my-3 text-3xl font-semibold leading-tight text-gray-700">
                            {numPlayers * 0.01} ETH
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-2 md:w-1/3">
                    <div className="mb-4 rounded-lg shadow-sm">
                      <div className="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl">
                        <div className="relative px-3 pt-8 pb-10 text-center">
                          <h4 className="text-sm leading-tight text-gray-500 uppercase">
                            Last winner
                          </h4>
                          <h3 className="my-3 text-3xl font-semibold leading-tight text-gray-700">
                            {recentWinner.slice(0, 5)}...
                            {recentWinner.slice(recentWinner.length - 4)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={async function () {
                await enterLottery({
                  onSuccess: handleSuccess,
                  onError: (error) => console.log(error),
                });
              }}
              className="inline-flex items-center justify-center hidden w-full px-6 py-4 mt-8 text-lg font-medium text-white border border-transparent rounded-md sm:inline-block hover:bg-indigo-400 sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500"
              disabled={isLoading || isFetching}
            >
              {isLoading || isFetching ? (
                <div className="w-8 h-8 border-b-2 rounded-full animate-spin spinner-border"></div>
              ) : (
                <div>Enter the next round (0.01 ETH) </div>
              )}
            </button>
          </>
        ) : (
          <>
            <div className="pt-12 text-xl font-bold text-red-800">
              Please connect your wallet to play.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
