import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { useGlobalContext } from '../context';
import { PageHOC, CustomButton, CustomInput, GameLoad } from '../components';




const CreateBattle = () => {
    const { contract, battleName, setBattleName } = useGlobalContext();
    const [waitBattle, setWaitBattle] = useState(true);
    const navigate = useNavigate();


    const handleClick = async () => {
        if (!battleName || !battleName.trim()) return null;
        try {
            await contract.createBattle(battleName);
            setWaitBattle(true); // The setWaitbattle component (gameLoad) is yet to be created 
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {waitBattle && <GameLoad />}
            <div className="flex flex-col mb-5">
                <CustomInput
                    label="Battle"
                    placeHolder="Enter Battle name"
                    value={battleName}
                    handleValueChange={setBattleName}
                />

                <CustomButton
                    title="Create Battle"
                    handleClick={handleClick}
                    restStyles="mt-6"
                />
            </div>
            <p className={styles.infoText} onClick={() => navigate('/join-battle')}>Join Current Ongoing Battle</p>
        </>
    )
};

export default PageHOC(CreateBattle,
    <>Create <br /> a new Lobby</>,
    <>Start your own battle and  <br />
        wait for your friends to join </>
);