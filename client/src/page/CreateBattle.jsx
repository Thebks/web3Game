import React from 'react';
import { PageHOC } from '../components';

const CreateBattle = () => {
    return (
        <div>
            <h1 className='text-white text-xl'>Hello From Create Battle</h1>
        </div>
    )
};

export default PageHOC(CreateBattle,
    <>Create <br /> a new Lobby</>,
    <>Start your own battle and  <br />
        wait for your friends to join </>
);