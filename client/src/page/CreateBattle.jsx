import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { useGlobalContext } from '../context';
import { PageHOC, CustomButton, CustomInput } from '../components';

const handleClick = () => {

};


const CreateBattle = () => {
    const { contract, battleName, setBattleName } = useGlobalContext();
    const navigate = useNavigate();
    return (
        <>
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
        </>
    )
};

export default PageHOC(CreateBattle,
    <>Create <br /> a new Lobby</>,
    <>Start your own battle and  <br />
        wait for your friends to join </>
);