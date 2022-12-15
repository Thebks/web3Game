import React, { useState } from 'react';
import { PageHOC, CustomInput, CustomButton } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {

  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');

  const handleClick = async () => {
    try {
      console.log({ contract })
      const playerExists = await contract.isPlayer(walletAddress);
      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName) // this is where I was making a mistake as I was sending one less argumentez

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being registered`
        })
      }
    } catch (error) {
      console.log(error, error.message)
      setShowAlert({
        status: true,
        type: "failure",
        message: error.message  // I can see the error message but in the video jsm got an error(tested on Brave)
      })
    }
  }

  return (
    <div className='flex flex-col'>
      <CustomInput
        label='Name'
        placeHolder='Enter your Name'
        value={playerName}
        handleValueChange={setPlayerName}   //this is where the ENS problem was coming from as we didnt call the useState
      />

      <CustomButton
        title='Register'
        handleClick={handleClick}
        restStyles='mt-6'
      />
    </div>
  )
};

export default PageHOC(Home,
  <>Welcome to AvaxGods <br /> A web3 Card Royal Game</>,
  <>Connect your wallet to start playing <br />
    The Ultimate Battle Royal Card Game </>
);