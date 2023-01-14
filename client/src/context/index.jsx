import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from "react-router-dom";
import { ABI, ADDRESS } from '../contract';
import { createEventListeners } from './createEventListeners';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState('');
    const [contract, setContract] = useState('');
    const [showAlert, setShowAlert] = useState({
        status: false,
        type: 'info',
        message: ''
    });
    const [battleName, setBattleName] = useState('');
    const [gameData, setGameData] = useState({
        players: [], pendingBattles: [], activaBattle: null
    });
    const [updateGameData, setUpdateGameData] = useState(0);
    const [battleGround, setBattleGround] = useState('bg-astral');


    const navigate = useNavigate();
    // Set the current Wallet address to the state

    const updateCurrentWalletAddress = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts) setWalletAddress(accounts[0]);
        //console.log(accounts)
    };

    useEffect(() => {
        updateCurrentWalletAddress();

        window.ethereum.on('accountsChanged', updateCurrentWalletAddress);
    }, []);

    // Set smartcontract provider to the state

    useEffect(() => {
        const setSmartContractAndProvider = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const newProvider = new ethers.providers.Web3Provider(connection);
            const signer = newProvider.getSigner();
            const newContract = new ethers.Contract(ADDRESS, ABI, signer);
            //const myContract = await newContract.deploy({gas:8000000}).send();

            setProvider(newProvider);
            setContract(newContract);

        };
        setSmartContractAndProvider();
    }, []);

    useEffect(() => {
        if (contract) {
            createEventListeners({
                navigate, walletAddress, contract,
                setShowAlert, provider, setUpdateGameData
            })
        }
    }, [contract]);

    useEffect(() => {
        if (showAlert?.status) {
            const timer = setTimeout(() => {
                setShowAlert({ status: false, type: 'info', message: '' })
            }, [5000])

            return () => clearTimeout(timer);
        }
    }, [showAlert]); // watch this line


    //Set game data to the state 
    useEffect(() => {
        const fetchGameData = async () => {
            const fetchedBattles = await contract.getAllBattles();
            // console.log(fetchedBattles);
            const pendingBattles = fetchedBattles.filter(battle => battle.battleStatus === 0);

            let activeBattle = null;

            fetchedBattles.forEach((battle) => {
                if (battle.players.find(player => player.toLowerCase() === walletAddress.toLowerCase())) {
                    if (battle.winner.startsWith('0x00')) {
                        activeBattle = battle;
                    }
                }
            });
            // updating game data
            setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle })
        }
        if (contract) fetchGameData();
    }, [contract, updateGameData]);

    return (
        <GlobalContext.Provider value={{
            contract, walletAddress, showAlert, setShowAlert, battleName, setBattleName, gameData, setGameData, battleGround, setBattleGround
        }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);