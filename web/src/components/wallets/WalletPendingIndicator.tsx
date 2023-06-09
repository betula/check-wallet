import { walletListStore } from "../../stores/wallet-list-store";
import { observer } from "mobx-react-lite";

export const WalletPendingIndicator = observer(() => {
  if (!walletListStore.sync.pending) {
    return null;
  }
  return (
    <img src="/pending.svg" />
  )
});