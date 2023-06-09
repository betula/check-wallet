import { observer } from "mobx-react-lite";
import { rateStore } from "../../stores/rate-store";
import { RateForm } from "./RateForm";

export const Rate = observer(() => {
  return (
    <div className="container my-3">
      <h2>Exchange rate</h2>

      {rateStore.initialized ? <RateForm /> : ''}
    </div>
  )
});