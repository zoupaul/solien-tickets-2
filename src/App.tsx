import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";


const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet() ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button" >
          <img src="/icons/close.svg" alt="" onClick={toggleMenu}/>
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>
            <div className="social-icons">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <div className="social-icons"> 
            <img className="nav-logo" src="/img/logo.png" alt=""></img>
            <a className="nav-title" href="https://soliens.super.site">
                Soliens DAO
            </a>
          </div>
          
          <div className="social-icons">
            <a href="https://twitter.com/soliensnft">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://discord.gg/RzBqCYxuGy">  
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>
            </div>
        </div>
      </nav>
      <br></br>
      <br></br>
      <br></br>
      <div className="content-wrapper">
          <header className="card" id="link1">
            <div style={{ padding: "0 24px 0 24px 0" }}>
              <h1 className="pb-3">Solien | Tickets</h1>
              <p className="text-secondary-color">
              Soliens DAO is proud to present this unique investment opportunity in the future of your PhotoFinish 2 stable! Each ticket minted here is redeemable for ONE (1) cover with the RANK #13 Stylish Stud. This opportunity is designed to allow those persons without the means to PURCHASE such a rare stud for themselves to still be able to generate a top-notch racehorse, and to start their stable off on the right foot. Simply connect your wallet and click the mint button, just like any other mint; but do it fast, as there are only 30 tickets available!
              </p>
            </div>
            <div>
              <ThemeProvider theme={theme}>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>
                      
                        <Minter
                          candyMachineId={candyMachineId}
                          
                          connection={connection}
                          startDate={startDateSeed}
                          txTimeout={txTimeout}
                          rpcHost={rpcHost}
                        />
                      
                    </WalletDialogProvider>
                  </WalletProvider>
                </ConnectionProvider>
              </ThemeProvider>
            </div>
          </header>
           

          
          <div id="link4" className="container faq card">
            <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
            <div>
              <h4>What is the minting price?</h4>
              <p>
              The minting price is 5 SOL per Stylish Stud Ticket.
              </p>

              <hr />
            </div>
            
            <div>
              <h4>What restrictions exist in Filly selection, if any?</h4>
              <p>
              1/1 Fillies are excluded from the Stylish Stud breeding tickets and can be handled on a case-by-case basis, all other Fillies are fair game!
              </p>

              <hr />
            </div>

            <div>
              <h4>How will breeding work?</h4>
              <p>
              Prior to the event, and all throughout, Soliens will maintain constant communication with ticket purchasers to ensure no mistakes are made. 
              Ticket holders will communicate which Filly they intend to use, then will send 1 ticket, along with the aforementioned Filly, from a pre-sepecified wallet to the DAO treasury wallet. After which point, the DAO will transact the breeding on the PhotoFinish 2 website before returning both the Filly and resultant foal to the original wallet.
              </p>

              <hr />
            </div>

            <div>
              <h4>When will I be able to breed?</h4>
              <p>
              Once the breeding event commences, the Soliens DAO will begin accepting tickets and Fillies to execute the breeding process. Ticket holders will be serviced in the order of their ticket number, though will be temporarily skipped should they not be prepared when it is their turn.
              </p>

              <hr />
            </div>
          </div>
      </div>
    </div>
  );
};

export default App;
