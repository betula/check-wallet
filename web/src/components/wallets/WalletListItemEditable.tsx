import { observer } from "mobx-react-lite";
import { WalletRecord, walletListStore } from "../../stores/wallet-list-store";
import { useState } from "react";

interface Props {
  record: WalletRecord,
  onExit: VoidFunction;
}

export const WalletListItemEditable = observer(({ record, onExit }: Props) => {
  const [text, setText] = useState(record.address);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    walletListStore.updateAddress(record, text);
    onExit();
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  }

  return (
    <form className="d-flex row g-2 flex-grow-1" onSubmit={handleSubmit}>
      <div className="col-auto col-8">
        <input 
          type="text"
          value={text}
          onInput={handleInput}
          className="form-control"
          placeholder="Type wallet address..."/>
      </div>
      <div className="col-auto col-4 gap-2 d-flex align-items-center">
        <button type="submit" className="btn" style={{padding: 0}}>
          <i className="bi bi-check-lg"></i>
        </button>
        <i role="button" className="bi bi-x-lg" onClick={onExit}></i>
      </div>
    </form>
  );
});