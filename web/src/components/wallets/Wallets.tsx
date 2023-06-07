import { WalletListGroup } from "./WalletListGroup";
import { WalletListBlank } from "./WalletListBlank";
import { WalletFavLink } from "./WalletFavLink";
import { WalletPendingIndicator } from "./WalletPendingIndicator";

export function Wallets() {
  return (
    <div className="container my-3">
      <h1>Wallets <WalletPendingIndicator /></h1>

      <WalletListGroup />
      <WalletListBlank />
      <WalletFavLink />

    </div>
  )
}