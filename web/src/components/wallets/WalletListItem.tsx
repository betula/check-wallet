import { observer } from "mobx-react-lite";
import MiddleTruncate from 'react-middle-truncate';
import { WalletRecord, walletListStore } from "../../stores/wallet-list-store";

interface Props {
  record: WalletRecord
}

export const WalletListItem = observer(({ record }: Props) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex gap-3" style={{overflow: 'hidden'}}>
        <i className="bi bi-star"></i>
        <div style={{overflow: 'hidden'}}>
          <MiddleTruncate
            text={record.address}/>
        </div>
      </div>
      <div className="d-flex gap-3">
        <i className="bi bi-pencil-square"></i>
        <i className="bi bi-trash3" onClick={() => walletListStore.remove(record)}></i>
      </div>
    </li>
  );
});