import React, { useState } from 'react';
import { PageHOC, CustomInput, CustomButton } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {

  const { contract, walletAddress } = useGlobalContext();
  const { playerName, setPlayerName } = useState('');

  return (
    <div className='flex flex-col'>
      <CustomInput
        label='Name'
        placeHolder='Enter your Name'
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton
        title='Register'
        handleClick={() => { }}
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