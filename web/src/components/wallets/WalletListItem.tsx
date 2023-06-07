import { WalletRecord } from "../../logic/wallet-list";

interface Props {
  record: WalletRecord
}

export function WalletListItem({ record }: Props) {
  return (
    <p>{record.address}</p>
  );
}