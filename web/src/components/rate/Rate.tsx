import { observer } from "mobx-react-lite";
import { useState } from "react";
import { rateStore } from "../../stores/rate-store";
import { RateForm } from "./RateForm";

export const Rate = observer(() => {
  return (
    <div className="container my-3">
      <h2>Exchange rate {rateStore.pending ? <img src="/pending.svg" /> : ''}</h2>

      {rateStore.initialized ? <RateForm /> : ''}
    </div>
  )
});