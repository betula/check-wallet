import { useState } from "react";
import { walletListStore } from "../../stores/wallet-list-store";


export function WalletListBlank() {
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    walletListStore.add(text);
    setText('');
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  }

  return (
    <form className="my-2 row g-3" onSubmit={handleSubmit}>
      <div className="col-auto col-8">
        <input 
          type="text"
          value={text}
          onInput={handleInput}
          className="form-control"
          placeholder="Type wallet address..."/>
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">Add</button>
      </div>
    </form>
  );
}