import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { FavoriteListStoreLocal } from '../stores/favorite-list-store-local';

export const FavoritesList = observer(() => {
  const store = useMemo(() => new FavoriteListStoreLocal(), []);
  useEffect(() => () => store.destroy(), [store]);

  if (!store.sync.initialized) {
    return;
  }

  return (
    <>
      {store.list.map((item, index) => (
        <p key={index}>
          <p>Address: {item.address}</p>
          <p>Eth: {item.eth}</p>
          <p>Balance: {item.inCurrency}</p>
          <p>Old: {item.old ? 'yes' : 'no'}</p>
          <hr />
        </p>
      ))}
    </>
  );
});
