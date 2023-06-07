import { observer } from "mobx-react-lite";
import { walletListStore } from "../../stores/wallet-list-store";

export const WalletFavLink = observer(() => {
  const { list } = walletListStore;

  if (!list.length) {
    return null;
  }

  return (
    <div>
      Please add some of your wallets to favorites, for checking.
    </div>
  );
});