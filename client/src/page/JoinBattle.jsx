import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGlobalContext } from '../context'
import { CustomButton, PageHOC } from '../components'
import styles from '../styles'

const JoinBattle = () => {

    const { contract, gameData, setBattleName, setShowAlert, walletAddress, battleName, setErrorMessage } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (gameData?.activeBattle?.battleStatus === 1) {
            navigate(`/battle${gameData.activeBattle.name}`);
        }
    }, [gameData])

    const handleClick = async (battleName) => {
        setBattleName(battleName)
        // console.log("hello here")
        try {
            await contract.joinBattle(battleName)
            setShowAlert({ status: true, type: 'success', message: `joining ${battleName}` })

        } catch (error) {
            setErrorMessage(error)
        }
    }


    //console.log("im here")
    return (
        <>
            <h2 className={styles.joinHeadText}> List of Available Battles </h2>
            <div className={styles.joinContainer}>
                {gameData.pendingBattles.length
                    ? gameData.pendingBattles
                        .filter((battle) => !battle.players.includes(walletAddress))
                        .map((battle, index) => (
                            <div className={styles.flexBetween} key={battle.name + index}>
                                <p className={styles.joinBattleTitle}>{index + 1}: {battle.name}</p>
                                <CustomButton
                                    title="Join"
                                    handleClick={() => handleClick(battle.name)}
                                />
                            </div>
                        ))
                    : <p className={styles.joinLoading}> Reload to see new battles</p>
                }
            </div>
            <p className={styles.infoText} onClick={() => navigate('/create-battle')}>Or Create a new Battle</p>
            <CustomButton
                title="Join Battle"
                handleClick={handleClick}
                restStyles="mt-6"
            />
        </>
    )
}

export default PageHOC(JoinBattle,
    <> Join <br /> Battle</>,
    <>Join Current Ongoing Battle</>
)