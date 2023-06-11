import { observer } from "mobx-react-lite";
import { walletListStore } from "../../stores/wallet-list-store";
import { LinkContainer } from "react-router-bootstrap";

export const WalletFavLink = observer(() => {
  const { favorites, list } = walletListStore;

  if (!list.length) {
    return null;
  }

  if (!favorites.length) {
    return (
      <div className="alert alert-info" role="alert">
        Please add some of your wallets to favorites <i className="bi bi-star"></i>, for checking.
      </div>
    );
  }

  return (
    <div className="d-grid">
      <LinkContainer to="/favorites">
        <button className="btn btn-primary btn-block" type="button">
          {favorites.length === 1 ? 'Check favorite wallet' : 'Check all favorite wallets'}
        </button>
      </LinkContainer>
    </div>
  )
});