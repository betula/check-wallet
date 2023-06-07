import { signal } from '@preact/signals-react';

export interface WalletRecord {
  address: string;
}

export const walletList$ = signal(<WalletRecord[]>[]);
export const walletListSyncing$ = signal(false);


export function addWallet(address: string) {
  walletList$.value = [
    ...walletList$.value,
    { address }
  ];
}

export function updateWallet(record: WalletRecord, address: string) {
  walletList$.value = walletList$.value.map(item => {
    if (Object.is(item, record)) {
      return { address };
    }
    else {
      return item;
    }
  });
}

export function removeWallet(record: WalletRecord) {
  walletList$.value = walletList$.value.filter(item => !Object.is(item, record));
}