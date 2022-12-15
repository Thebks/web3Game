import { ethers } from 'ethers';
import { ABI } from '../contract';
import { Contract } from 'ethers';

const AddNewEvent = (eventFilter, provider, callback) => {
    provider.removeListener(eventFilter);

    provider.on(eventFilter, (logs) => {
        const parsedLog = (new ethers.Utils.Interface(ABI).parseLog(logs))

        callback(parsedLog);
    });
};

export const createEventListeners = () => {
    const newPlayerEventFilter = Contract.filters.newPlayer();

    AddnewPlayer(newPlayerEventFilter, provider, ({ args }) => {
        console.log("New Player Created!", args);
    })
}