import { WalletListItem } from "./WalletListItem";
import { walletList$ } from "../../logic/wallet-list";

export function WalletList() {
  const list = walletList$.value;

  return (
    <>
      {list.map(record => (
        <WalletListItem record={record} />
      ))}
    </>
  );
}