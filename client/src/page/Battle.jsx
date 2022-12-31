import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from '../styles';
import { Alert } from '../components';
import { useGlobalContext } from '../context';
import { attack, attackSount, defence, defenceSound, player01 as player01Icon, player02 as player02Icon } from '../assets';
import { playAudio } from '../utils/animation.js';


const Battle = () => {
    const { contract, gameData, walletAddress, showAlert, setShowAlert } = useGlobalContext();
    const [player1, setPlayer1] = useState({});
    const [player2, setPlayer2] = useState({}); // navigates to the name of the battle (battle/nameofthebattle)
    const { battleName } = useParams();
    const navigate = useNavigate();
    return (
        <div>Battle</div>
    )
}

export default Battle