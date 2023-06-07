import { UserButton } from "@clerk/clerk-react";
import { Wallets } from './wallets/Wallets';
import publicIconSvg from '../../public/icon.svg';

export function Main() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container justify-content-between">
          <a className="navbar-brand align-items-center d-flex gap-1">
            <img src={publicIconSvg} height="24px"  />
            Check Wallet
          </a>
          <div>
            <UserButton />
          </div>
        </div>
      </nav>

      <Wallets />
    </>
  );
}
