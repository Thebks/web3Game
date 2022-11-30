import React from 'react';
import { PageHOC } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { demo } = useGlobalContext();
  return (
    <div>
      <h1 className='text-white text-xl'>Hello From Home</h1>
      <h2 className='text-xl text-white'> {demo}</h2>
    </div>
  )
};

export default PageHOC(Home,
  <>Welcome to AvaxGods <br /> A web3 Card Royal Game</>,
  <>Connect your wallet to start playing <br />
    The Ultimate Battle Royal Card Game </>
);