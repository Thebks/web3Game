import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomButton from './CustomButton'
import { useGlobalContext } from '../context'
import { alertIcon, gameRules } from '../assets'
import styles from '../styles'

const GameInfo = () => {
    const { gameData, contract, setShowAlert, setErrorMessage } = useGlobalContext();
    const navigate = useNavigate();
    const [toggleSideBar, setToggleAlert] = useState(false);

    const handleBattleExit = async () => {
        const battleName = gameData.avtiveBattle.name;

        try {
            await contract.quitBattle(battleName);

            setShowAlert({ status: true, type: 'info', message: `You're about to quit ${battleName}` });

        } catch (error) {
            setErrorMessage(error)
        }
    }

    return (
        <>
            <div className={styles.gameInfoIconBox}>
                <div className={`${styles.gameInfoIcon} ${styles.flexCenter}`} onClick={() => setToggleAlert(true)}>
                    <img src={alertIcon} alt='info' className={styles.gameInfoIconImg} />
                </div>
            </div>
            <div className={`${styles.gameInfoSidebar} ${toggleSideBar ? 'translate-x-0' : 'translate-x-full'} 
            ${styles.glassEffect} ${styles.flexBetween} backdrop-blur-3xl`} >
                <div className='flex flex-col'>
                    <div className={styles.gameInfoSidebarCloseBox}>
                        <div className={`${styles.flexCenter} ${styles.gameInfoSidebarClose}`} onClick={() => setToggleAlert(false)}>
                            x
                        </div>
                    </div>
                    <h3 className={styles.gameInfoHeading}>Game Rules:</h3>
                    <div className='mt-3'>
                        {gameRules.map((rules, index) => (
                            <p key={`game-rule-${index}`} className={styles.gameInfoText}>
                                <span className='font-bold'>{index + 1}</span>
                                . {rules}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={`${styles.flexBetween} mt-10 gap-4 w-full`}>
                    <CustomButton title="Change Battleground"
                        handleClick={() => navigate('/battleground')} />
                    <CustomButton title='Exit Battle'
                        handleClick={handleBattleExit} />
                </div>
            </div>
        </>
    )
}

export default GameInfo