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
      <div className="col-auto col-4 gap-2 d-flex">
        <button type="submit" className="btn btn-primary btn-sm">
          Ok
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onExit}
          >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </form>
  );
});