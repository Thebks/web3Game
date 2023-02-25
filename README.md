# A Blockchain Card Game

![Game Lobby](https://github.com/Thebks/web3Game/blob/master/client/src/assets/web3image.png)

### Big Thanks to [JS Mastery](https://github.com/adrianhajdin). 

###### Instructions to get started 

`cd web3`

`npx hardhat` -> y → typescript → enter → enter

`npm install @openzeppelin/contracts dotenv @nomiclabs/hardhat-ethers`

HardHat packages `npm install --save-dev "hardhat@^2.12.0" "@nomicfoundation/hardhat-toolbox@^2.0.0"`

Install Metamask or any wallet of your choice and if you wish to use Avalanche test network then you can do so by connecting your wallet to Avalanche Fauji Testnet on [Chainlist](https://chainlist.org/?search=avalanche+fuji&testnets=true).

Create a `.env` file and add a private_key variable.

Follow the instructions to to get your wallet private key on [Metamask](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).

Compile the contract by running the npx hardhat compile command.

Deploy the smart contract on the Fuji test network by running the `npx hardhat run scripts/deploy.ts --network fuji` command.

Move the `/artifacts/contracts/AVAXGods.json` file to the `/contract` folder.

On the frontend Copy the address of the deployed contract from the terminal and paste it into the `/contract/index.js` file of the frontend application.




