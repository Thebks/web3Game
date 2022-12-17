import { ethers } from 'ethers';
import { ABI } from '../contract';
import { Contract } from 'ethers';

const AddNewEvent = (eventFilter, provider, callback) => {
    provider.removeListener(eventFilter);

    provider.on(eventFilter, (logs) => {
        const parsedLog = (new ethers.utils.Interface(ABI).parseLog(logs))

        callback(parsedLog);
    });
};

export const createEventListeners = ({ navigate, contract, provider, walletAddress, setShowAlert }) => {
    const NewPlayerEventFilter = contract.filters.NewPlayer();

    AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
        console.log("New Player Created!", args);

        if (walletAddress === args.owner) {
            setShowAlert({
                status: true,
                type: 'success',
                message: "player is being success created"
            });
        }
    });
}