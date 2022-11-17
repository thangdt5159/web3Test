import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isMetamaskInstalled, setIsMetamaskinstalled] =
    useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectWallet = () => {
    if ((window as any).ethereum) {
      (window as any).ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: string[]) => {
          setAccount(result[0]);
          getAccountBalance(result[0].toString());
        });
    }
  };

  const getAccountBalance = (address: string) => {
    (window as any).ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance: any) => {
        setBalance(ethers.utils.formatEther(balance));
      });
  };

  (window as any).ethereum.on("accountsChanged", connectWallet);
  (window as any).ethereum.on("chainChanged", () => {
    window.location.reload();
  });

  useEffect(() => {
    if ((window as any).ethereum) {
      setIsMetamaskinstalled(true);
    }
  }, []);

  if (account === null) {
    return (
      <div>
        {isMetamaskInstalled ? (
          <>
            <button onClick={connectWallet}>Connect wallet </button>
          </>
        ) : (
          <p>Install Your Metamask wallet</p>
        )}
      </div>
    );
  }
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>account: {account}</div>
      <div>balance: {balance}</div>
    </div>
  );
}

export default App;
