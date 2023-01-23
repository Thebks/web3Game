import React from 'react'
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { Alert } from '../components';
import { battlegrounds } from '../assets';
import { useGlobalContext } from '../context';


const Battleground = () => {
    const { setBattleground, setShowAlert, showAlert } = useGlobalContext();

    return (
        <div className={`${styles.flexCenter} ${styles.battlegroundContainer}`}>
            {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}

            <h1 className={`${styles.headText} text-center`}>
                Choose Your<span className="text-siteViolet"> Battle </span>
                Ground
            </h1>
        </div>
    )
}

export default Battleground