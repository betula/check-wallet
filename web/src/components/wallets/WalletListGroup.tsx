import { observer } from "mobx-react-lite";
import { WalletListItem } from "./WalletListItem";
import { walletListStore } from "../../stores/wallet-list-store";

export const WalletListGroup = observer(() => {
  const { list } = walletListStore;

  if (!list.length) {
    return (
      <div className="mt-3">Please add some wallets</div>
    )
  }

  return (
    <ul className="list-group">
      {list.map((record, index) => (
        <WalletListItem record={record} key={index} />
      ))}
    </ul>
  );
});