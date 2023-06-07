import { WalletList } from "./WalletList";
import { WalletListBlank } from "./WalletListBlank";

export function Wallets() {
  return (
    <>
      <h1>Wallets</h1>

      <WalletList />
      <WalletListBlank />
      <p>
        Please add some of your wallet to favorites, for checking.
      </p>
    </>
  )
}