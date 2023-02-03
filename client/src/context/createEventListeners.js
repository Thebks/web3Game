import { ethers } from 'ethers';
import { ABI } from '../contract';
import { playAudio, sparcle } from '../utils/animation.js';

import { defenseSound } from '../assets';


const AddNewEvent = (eventFilter, provider, callback) => {
    provider.removeListener(eventFilter);

    provider.on(eventFilter, (logs) => {
        const parsedLog = (new ethers.utils.Interface(ABI).parseLog(logs))

        callback(parsedLog);
    });
};

const getcoordinates = (cardRef) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    return {
        pageX: left + width / 2,
        pageY: top + height / 2.25,
    }
}

export const createEventListeners = ({ navigate, contract, provider, walletAddress, setShowAlert, setUpdateGameData, player1Ref, player2Ref }) => {
    const NewPlayerEventFilter = contract.filters.NewPlayer();

    AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
        console.log("New Player Created!", args);

        if (walletAddress === args.owner) {
            setShowAlert({
                status: true,
                type: 'success',
                message: "player is being successfully created"
            });
        }
    });

    const newBattleEvent = contract.filters.NewBattle();

    AddNewEvent(newBattleEvent, provider, ({ args }) => {
        console.log("new battle started", args, walletAddress);
        if (walletAddress.toLowerCase() === args.player1.toLowerCase() || walletAddress.toLowerCase() === args.player2.toLowerCase()) {
            navigate(`/battle/${args.battleName}`)
        }

        setUpdateGameData((previousUpdateGameData) => previousUpdateGameData + 1);
    });

    const BattleMoveEventFilter = contract.filters.BattleMove();

    AddNewEvent(BattleMoveEventFilter, provider, ({ args }) => {
        console.log('Battle has begun', args);
    });


    const RoundEndedEventFilter = contract.filter.RoundEnded();

    AddNewEvent(RoundEndedEventFilter, provider, ({ args }) => {
        console.log('Round End!', args, walletAddress);

        for (let i = 0; i < args.damagedPlayers.length; i++) {
            if (args.damagedPlayers[i] === walletAddress) {
                sparcle(getcoordinates(player1Ref));
            } else if (args.damagedPlayers[i] !== walletAddress) {
                sparcle(getcoordinates(player2Ref));
            } else {
                playAudio(defenseSound);
            }
        }
    });

}

//  Im right here will commence from here ok