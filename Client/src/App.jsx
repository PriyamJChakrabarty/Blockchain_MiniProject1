import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './Constant/constant';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [word, setWord] = useState('');
  const [words, setWords] = useState([]);

  useEffect(() => {
    console.log('Provider:', provider);
    console.log('Account:', account);
    console.log('Is Connected:', isConnected);

    if (window.ethereum) {
      console.log("MetaMask detected");
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    if (isConnected) {
      fetchWords();
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [isConnected]);

  async function connectToMetamask() {
    if (window.ethereum) {
      console.log("MetaMask detected");
      try {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider);
        await newProvider.send("eth_requestAccounts", []);
        const signer = newProvider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
        fetchWords();
      } catch (err) {
        console.error('Error connecting to MetaMask:', err);
      }
    } else {
      console.error("MetaMask is not detected in the browser");
    }
  }

  async function uploadWord() {
    try {
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const tx = await contractInstance.uploadWord(word);
      await tx.wait();
      setWord(''); // Clear the input after successful upload
      fetchWords(); // Fetch the updated list of words
    } catch (err) {
      console.error('Error uploading word:', err);
    }
  }

  async function fetchWords() {
    try {
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, provider);
      const wordsList = await contractInstance.getWords();
      setWords(wordsList);
    } catch (err) {
      console.error('Error fetching words:', err);
    }
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      setIsConnected(true);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      {isConnected ? (
        <div>
          <h2>Connected Account: {account}</h2>
          <input 
            type="text" 
            value={word} 
            onChange={(e) => setWord(e.target.value)} 
            placeholder="Enter a word" 
          />
          <button onClick={uploadWord}>Upload Word</button>
          <div className="words-list">
            <h3>Uploaded Words:</h3>
            <ul>
              {words.length > 0 ? (
                words.map((word, index) => (
                  <li key={index}>{word}</li>
                ))
              ) : (
                <li>No words uploaded yet.</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <button onClick={connectToMetamask}>Connect to MetaMask</button>
      )}
    </div>
  );
}

export default App;
