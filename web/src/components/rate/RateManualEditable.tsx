import { observer } from "mobx-react-lite";
import { useState } from "react";
import { rateStore } from "../../stores/rate-store";

interface Props {
  onExit: VoidFunction;
}

export const RateManualEditable = observer(({ onExit }: Props) => {
  const [text, setText] = useState(rateStore.selectedCurrency?.ethCost || rateStore.ethCostManual);
  const [valid, setValid] = useState(true);

  const validate = (value: string) => {
    const state = /^\d+(\.\d+)?$/.test(value);
    if (valid !== state) {
      setValid(state);
    }
    return state;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(text)) {
      return;
    }
    rateStore.manual(text)
    onExit();
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setText(value);
    setValid(true);
  }

  return (
    <form className="col-auto col-8 d-flex gap-2 align-items-center" onSubmit={handleSubmit}>
      <input 
        onInput={handleInput}
        type="text"
        value={text}
        className={'form-control ' + (valid ? '' : 'is-invalid')}
        style={{width: '112px'}}
        placeholder="Rate..."/>

      <div className="col-auto">
        <button type="submit" className="btn" style={{padding: 0}}>
          <i className="bi bi-check-lg"></i>
        </button>
      </div>
      <div className="col-auto">
        <i role="button" className="bi bi-x-lg" onClick={onExit}></i>
      </div>
    </form>
  )
});