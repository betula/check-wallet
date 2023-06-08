import { observer } from "mobx-react-lite";
import MiddleTruncate from 'react-middle-truncate';
import { WalletRecord, walletListStore } from "../../stores/wallet-list-store";
import { useState } from "react";
import { WalletListItemEditable } from "./WalletListItemEditable";

interface Props {
  record: WalletRecord
}

export const WalletListItem = observer(({ record }: Props) => {
  const toggleFavorite = () => walletListStore.toggleFavorite(record);

  const [editable, setEditable] = useState(false);

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex gap-3 align-items-center flex-grow-1" style={{overflow: 'hidden'}}>
        <i
          onClick={toggleFavorite}
          role="button"
          className={'bi bi-star' + (record.favorite ? '-fill' : '')}></i>

        {editable ? (
          <WalletListItemEditable record={record} onExit={() => setEditable(false)} />
        ) : (
          <div
            role="button"
            onClick={toggleFavorite}
            style={{overflow: 'hidden'}}
            title={record.address}>
            <MiddleTruncate
              text={record.address}/>
          </div>
        )}
      </div>
      <div className="d-flex gap-3">
        {!editable && <i role="button" className="bi bi-pencil-square" onClick={() => setEditable(true)}></i>}
        <i role="button" className="bi bi-trash3" onClick={() => walletListStore.remove(record)}></i>
      </div>
    </li>
  );
});