import React from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";
import { useWallet } from "./hooks";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { walletAddress, connectWallet, isLoading } = useWallet();

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!isLoading && !walletAddress && (
            <button
              className="cta-button connect-wallet-button"
              onClick={connectWallet}
            >
              Connect to Wallet
            </button>
          )}
          {isLoading && <p>Loading</p>}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
