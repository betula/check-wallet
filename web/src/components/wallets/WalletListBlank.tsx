import { useState } from "react";
import { addWallet } from "../../logic/wallet-list";


export function WalletListBlank() {
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addWallet(text);
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  }

  return (
    <form className="container row g-3" onSubmit={handleSubmit}>
      <div className="col-auto col-8">
        <input 
          type="text"
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