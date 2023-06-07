import { WalletListGroup } from "./WalletListGroup";
import { WalletListBlank } from "./WalletListBlank";
import { WalletFavLink } from "./WalletFavLink";

export function Wallets() {
  return (
    <div className="container my-3">
      <h1>Wallets</h1>

      <WalletListGroup />
      <WalletListBlank />
      <WalletFavLink />
      
    </div>
  )
}