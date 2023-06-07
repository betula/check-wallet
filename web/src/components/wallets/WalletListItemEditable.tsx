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
    <form className="d-flex row g-2" onSubmit={handleSubmit}>
      <div className="col-auto col-9">
        <input 
          type="text"
          value={text}
          onInput={handleInput}
          className="form-control"
          placeholder="Type wallet address..."/>
      </div>
      <div className="col-auto col-3">
        <button type="submit" className="btn btn-primary">
          Ok
        </button>
      </div>
    </form>
  );
});