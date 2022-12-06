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
        await contract.registerPlayer(playerName)
        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being registered`
        })
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='flex flex-col'>
      <CustomInput
        label='Name'
        placeHolder='Enter your Name'
        value={playerName}
        handleValueChange={setPlayerName}   //this is where the ENS problem could be as we didnt call the setvalue usestate
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