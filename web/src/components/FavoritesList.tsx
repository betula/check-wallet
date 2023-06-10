import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import MiddleTruncate from 'react-middle-truncate';
import { FavoriteListStoreLocal } from '../stores/favorite-list-store-local';

export const FavoritesList = observer(() => {
  const store = useMemo(() => new FavoriteListStoreLocal(), []);
  useEffect(() => () => store.destroy(), [store]);

  if (!store.sync.initialized) {
    return;
  }

  return (
    <div className="list-group">
      {store.list.map((item, index) => (
        <div className="list-group-item list-group-item-action" key={index}>
          <div className="d-flex align-items-center gap-3 overflow-hidden mb-2 mt-2">
              <MiddleTruncate
              text={item.address}/>
          </div>
          {item.old ? (
            <div className="alert alert-danger py-1 px-2" role="alert">
              <i className="bi bi-exclamation-triangle-fill"></i> Wallet is old!
            </div>
          ) : ''}
          <div className="d-flex align-items-center gap-3">
            <div className="col-auto col-md-1">Balance</div>
            <ul className="list-group list-group-horizontal col-auto">
              <li className="list-group-item d-flex align-items-center">{item.eth} Eth</li>
              <li className="list-group-item fs-6 fw-bold">{item.inCurrency}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
});
