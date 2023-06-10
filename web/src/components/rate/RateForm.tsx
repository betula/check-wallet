import { observer } from "mobx-react-lite";
import { useState } from "react";
import { rateStore } from "../../stores/rate-store";
import { RateManualEditable } from "./RateManualEditable";

export const RateForm = observer(() => {
  const [editable, setEditable] = useState(false);

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    rateStore.select(event.currentTarget.value);
  }

  return (
    <div className="my-2 row g-3">
      <div className="col-auto">
        <select
          className="form-select"
          style={{width: '112px'}}
          value={rateStore.selectedName}
          onChange={handleChange}>
          {rateStore.currencies.map((item, index) => (
            <option 
              value={item.name} 
              key={index}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="col-auto d-flex gap-3 col-8 align-items-center">
          {!editable ? (
            <>
              <div className="col-auto" onClick={() => setEditable(true)} style={{cursor: 'pointer'}}>
                {rateStore.selectedCurrency?.ethCost}
              </div>
              <div className="col-auto">
                <i role="button" className="bi bi-pencil-square" onClick={() => setEditable(true)}></i>
              </div>
            </>
          ) : (
            <RateManualEditable onExit={() => setEditable(false)} />
          )}
      </div>
    </div>
  )
});