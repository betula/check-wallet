import { WalletListGroup } from "./WalletListGroup";
import { WalletListBlank } from "./WalletListBlank";
import { WalletFavLink } from "./WalletFavLink";
import { walletListStore } from "../../stores/wallet-list-store";
import { observer } from "mobx-react-lite";

export const Wallets = observer(() => {

  function renderBody() {
    if (!walletListStore.sync.initialized) {
      return null;
    }

    return (
      <>
        <WalletListGroup />
        <WalletListBlank />
        <WalletFavLink />
      </>
    );
  }

  return (
    <div className="container my-3">
      <h1>Wallets</h1>
      {renderBody()}
    </div>
  )
});