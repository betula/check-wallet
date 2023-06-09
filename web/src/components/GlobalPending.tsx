import { globalPendingStore } from '../stores/lib/global-pending-store';
import { observer } from 'mobx-react-lite';

export const GlobalPending = observer(() => {
  if (!globalPendingStore.pending) {
    return null;
  }

  return <img src="/pending.svg" style={{scale: '0.5'}} />
})