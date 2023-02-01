import { ethers } from 'ethers';
import { ABI } from '../contract';


const AddNewEvent = (eventFilter, provider, callback) => {
    provider.removeListener(eventFilter);

    provider.on(eventFilter, (logs) => {
        const parsedLog = (new ethers.utils.Interface(ABI).parseLog(logs))

        callback(parsedLog);
    });
};

export const createEventListeners = ({ navigate, contract, provider, walletAddress, setShowAlert, setUpdateGameData }) => {
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


}