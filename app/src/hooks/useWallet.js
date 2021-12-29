import { useCallback, useEffect, useState } from "react";

export const useWallet = () => {
  /*
   * Just a state variable we use to store our user's public wallet.
   */
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const { solana } = window;
      if (!solana) {
        throw Error("Solana object not found! Get a Phantom Wallet 👻");
      }
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  const checkIfWalletIsConnected = useCallback(async () => {
    setIsLoading(true);
    try {
      const { solana } = window;
      if (!solana) {
        throw Error("Solana object not found! Get a Phantom Wallet 👻");
      }
      console.log("Phantom Wallet 👻 found!");

      /*
       * The solana object gives us a function that will allow us to connect
       * directly with the user's wallet!
       */
      const response = await solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, [setError]);

  useEffect(() => {
    window.addEventListener("load", checkIfWalletIsConnected);
    return () => window.removeEventListener("load", checkIfWalletIsConnected);
  }, [checkIfWalletIsConnected]);

  return {
    walletAddress,
    error,
    isLoading,
    connectWallet,
  };
};
